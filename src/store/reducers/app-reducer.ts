import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase-config";

// ==== THUNKS ====

export const initializeAppTC = createAsyncThunk(
  "app/initialize",
  async (param, thunkAPI) => {
    const app = await initializeApp(firebaseConfig, "RS Cars");
    console.log("firebase", app);

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      if (app) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        // thunkAPI.dispatch(setIsLoggedInAC());
        return;
      } else {
        // handleServerAppError(response.data, thunkAPI.dispatch);
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: "App is not initialized",
      });
    } finally {
      thunkAPI.dispatch(setAppStatusAC({ status: "idle" }));
    }
  }
);

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle",

    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setAppStatusAC(
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) {
      state.status = action.payload.status;
    },

    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeAppTC.fulfilled, (state) => {
      state.isInitialized = true;
    });
  },
});

export const appReducer = slice.reducer;

export const { setAppErrorAC, setAppStatusAC } = slice.actions;

// ==== SELECTORS ====

export const appStatusSelector = (state: RootStateType) => state.app.status;
export const appErrorSelector = (state: RootStateType) => state.app.error;

//==== TYPES ====

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
