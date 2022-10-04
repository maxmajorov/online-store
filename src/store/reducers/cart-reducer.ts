import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { telegramAPI } from "../../api/api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

export const sendOrderInfoToTelegramTC = createAsyncThunk(
  "cart/sendOrderInfo",
  async (orderMessage: string, thunkAPI) => {
    const response = await telegramAPI.sendOrderInfo(orderMessage);

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));

      if (response.data.ok) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
      } else {
        // handleServerAppError(response.data., dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: response.status,
      });
    } finally {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
    }
  }
);

const slice = createSlice({
  name: "cart",
  initialState: {
    isDiscountUse: false,
    isMessageSendSuccess: false,
    discount: 0,
    orderNums: 0,
    ordersInCart: [] as Array<OrderType<OrderResponseType>>,
  },

  reducers: {
    setCountAC(state, action: PayloadAction<{ id: string; count: number }>) {
      state.ordersInCart.map((el) =>
        el.data.id === action.payload.id
          ? (el.count = action.payload.count)
          : el
      );
    },

    applyPromocodeAC(state, action: PayloadAction<{ discount: number }>) {
      state.ordersInCart.map(
        (el) =>
          (el.totalPrice =
            el.totalPrice - (el.totalPrice * action.payload.discount) / 100)
      );
      state.isDiscountUse = true;
      state.discount = action.payload.discount;
    },

    delPromocodeAC(state) {
      state.ordersInCart.map((el) => (el.totalPrice = el.data.price));

      state.isDiscountUse = false;
      state.discount = 0;
    },

    setOrdersToCartAC(
      state,
      action: PayloadAction<{ order: OrderType<OrderResponseType> }>
    ) {
      state.ordersInCart.push(action.payload.order);
      state.orderNums++;
    },

    removeOrderFromCartAC(
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) {
      state.ordersInCart = state.ordersInCart.filter(
        (el) => el.data.id !== action.payload.id
      );
      state.orderNums--;
    },
  },
  extraReducers(builder) {
    builder.addCase(sendOrderInfoToTelegramTC.fulfilled, (state, action) => {
      state.isMessageSendSuccess = true;
    });
  },
});

export const cartReducer = slice.reducer;
export const {
  setCountAC,
  applyPromocodeAC,
  delPromocodeAC,
  setOrdersToCartAC,
  removeOrderFromCartAC,
} = slice.actions;

// ==== SELECTORS ====

export const totalPriceSelector = (state: RootStateType) =>
  state.cart.ordersInCart
    .reduce((acc, next) => acc + next.count * next.totalPrice, 0)
    .toFixed(2);
export const isDiscountUseSelector = (state: RootStateType) =>
  state.cart.isDiscountUse;
export const ordersNumSelector = (state: RootStateType) => state.cart.orderNums;
export const ordersInCartSelector = (state: RootStateType) =>
  state.cart.ordersInCart;
export const isMessageSendSuccessSelector = (state: RootStateType) =>
  state.cart.isMessageSendSuccess;

// ==== TYPES ====

export type OrderType<T> = {
  data: T;
  count: number;
  totalPrice: number;
};

export type OrderResponseType = {
  id: string;
  body: string;
  brand: string;
  scale: string;
  category: string;
  articleNumber: string;
  fuel: string;
  gear: string;
  grade: number;
  image: string;
  inStore: boolean;
  model: string;
  price: number;
  year: number;
};
