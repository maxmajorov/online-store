import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  DocumentData,
  serverTimestamp,
} from "firebase/firestore";
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
    ordersInCart: [] as Array<OrderType>,
  },
  reducers: {
    setPriceAC(state, action: PayloadAction<{ price: number }>) {
      state.price = state.price + action.payload.price;
    },
    setOrdersNumAC(state) {
      state.orderNums++;
    },
    setOrdersToCartAC(state, action: PayloadAction<{ order: OrderType }>) {
      state.ordersInCart.push(action.payload.order);
    },
  },
  extraReducers(builder) {},
});

export const cartReducer = slice.reducer;
export const { setPriceAC, setOrdersNumAC, setOrdersToCartAC } = slice.actions;

// ==== SELECTORS ====

export const priceSelector = (state: RootStateType) => state.cart.price;
export const ordersNumSelector = (state: RootStateType) => state.cart.orderNums;
export const ordersInCartSelector = (state: RootStateType) =>
  state.cart.ordersInCart;

// ==== TYPES ====

export type OrderType = {
  body: string;
  brand: string;
  scale: string;
  fuel: string;
  gear: string;
  grade: number;
  image: string;
  inStore: boolean;
  model: string;
  price: number;
  year: number;
};
