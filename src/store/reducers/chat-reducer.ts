import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../..";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

export const sendNewMessageTC = createAsyncThunk(
  "chat/sendNewMessage",
  async (value: string, thunkAPI) => {
    //@ts-ignore
    const { uid, photoURL, displayName, email } = getAuth().currentUser;

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      await addDoc(collection(db, "messages"), {
        uid,
        name: displayName,
        email,
        photoURL,
        text: value,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: "Invalid email or password",
      });
    } finally {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    }
  }
);

const slice = createSlice({
  name: "chat",
  initialState: {
    messages: {},
  },
  reducers: {
    sendNewMessageAC(state, action: PayloadAction<{ value: string }>) {
      //@ts-ignore
      state.currentUser = action.payload.currentUser;
    },
  },
  extraReducers(builder) {},
});

export const chatReducer = slice.reducer;
export const { sendNewMessageAC } = slice.actions;

// ==== SELECTORS ====

export const isSignInSelector = (state: RootStateType) => state.auth.isSignIn;

// ==== TYPES ====
