import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const signInWithGoogleTC = createAsyncThunk(
  "auth/signInWithGoogle",
  async (param, thunkAPI) => {
    const auth = getAuth();

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      const response = await signInWithPopup(auth, new GoogleAuthProvider());

      if (response.user.uid) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return;
      } else {
        return thunkAPI.rejectWithValue({
          errors: "Email not found",
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: "Email not found",
      });
    }
  }
);

export const logoutTC = createAsyncThunk(
  "auth/logout",
  async (param, thunkAPI) => {
    const auth = getAuth();

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      await signOut(auth);
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: "Not exit",
      });
    } finally {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    isSignIn: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(signInWithGoogleTC.fulfilled, (state) => {
      state.isSignIn = true;
    });

    builder.addCase(signInWithEmailAndPasswordTC.fulfilled, (state) => {
      state.isSignIn = true;
    });

    builder.addCase(logoutTC.fulfilled, (state) => {
      state.isSignIn = false;
    });
  },
});

export const authReducer = slice.reducer;

// export const { setIsSignInWithGoogleAC, setIsSignInWithEmailAndPasswordAC
//  } = slice.actions;

// ==== SELECTORS ====

export const isSignInSelector = (state: RootStateType) => state.auth.isSignIn;

// ==== TYPES ====
