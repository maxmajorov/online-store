import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

interface ValidationErrors {
  errors: string;
}

export const signInWithEmailAndPasswordTC = createAsyncThunk(
  "auth/signInWithEmal",
  async (data: { email: string; password: string }, thunkAPI) => {
    const { email, password } = data;

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user.uid) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));

        return;
      } else {
        return thunkAPI.rejectWithValue({
          errors: "Invalid email or password",
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: "Invalid email or password",
      });
    }
  }
);

const slice = createSlice({
  name: "chat",
  initialState: {
    userName: "",
    userID: "",
  },
  reducers: {
    // setAuthInstanceAC(state, action: PayloadAction<{ auth: any }>) {
    //   state.auth = action.payload.auth;
    // },
  },
  extraReducers(builder) {
    // builder.addCase(signInWithGoogleTC.fulfilled, (state) => {
    //   state.isSignIn = true;
    // });
  },
});

export const chatReducer = slice.reducer;

// export const { setAuthInstanceAC } = slice.actions;

// ==== SELECTORS ====

export const isSignInSelector = (state: RootStateType) => state.auth.isSignIn;

export const authSelector = (state: RootStateType) => state.auth.auth;

// ==== TYPES ====
