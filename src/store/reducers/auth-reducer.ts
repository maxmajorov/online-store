import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { authAPI } from "../../api/api";
import { LoginParamsType } from "../../api/types";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

interface ValidationErrors {
  errors: Array<string>;
  fieldsErrors: Array<string>;
}

export const loginTC = createAsyncThunk<
  undefined,
  LoginParamsType,
  {
    rejectValue: ValidationErrors;
  }
>("authorization/login", async (data, thunkAPI) => {
  const response = await authAPI.login(data);

  try {
    thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
    if (response.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
      return;
    } else {
      handleServerAppError(response.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
        fieldsErrors: [""],
      });
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    handleServerNetworkError(err, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: response.data.messages,
      fieldsErrors: [""],
    });
  }
});

export const logoutTC = createAsyncThunk(
  "authorization/logout",
  async (param, thunkAPI) => {
    const response = await authAPI.logout();

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      if (response.data.resultCode === 0) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return;
      } else {
        handleServerAppError(response.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue({
          errors: response.data.messages,
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.data.messages,
      });
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state) {
      state.isLoggedIn = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(loginTC.fulfilled, (state) => {
      state.isLoggedIn = true;
    });

    builder.addCase(logoutTC.fulfilled, (state) => {
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = slice.reducer;

export const { setIsLoggedInAC } = slice.actions;

// ==== SELECTORS ====

export const isLoggedInSelector = (state: RootStateType) =>
  state.auth.isLoggedIn;

// ==== TYPES ====
