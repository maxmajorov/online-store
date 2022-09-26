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
  name: "cart",
  initialState: {
    price: 0.0,
    orderNums: 0,
  },
  reducers: {
    setPriceAC(state, action: PayloadAction<{ price: number }>) {
      state.price = state.price + action.payload.price;
    },
    setOrdersNumAC(state) {
      state.orderNums++;
    },
  },
  extraReducers(builder) {},
});

export const cartReducer = slice.reducer;
export const { setPriceAC, setOrdersNumAC } = slice.actions;

// ==== SELECTORS ====

export const priceSelector = (state: RootStateType) => state.cart.price;
export const ordersNumSelector = (state: RootStateType) => state.cart.orderNums;

// ==== TYPES ====
