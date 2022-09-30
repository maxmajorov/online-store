import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

// export const sendNewMessageTC = createAsyncThunk(
//   "chat/sendNewMessage",
//   async (value: string, thunkAPI) => {
//     //@ts-ignore
//     const { uid, photoURL, displayName, email } = getAuth().currentUser;

//     try {
//       thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
//       await addDoc(collection(db, "messages"), {
//         uid,
//         name: displayName,
//         email,
//         photoURL,
//         text: value,
//         createdAt: serverTimestamp(),
//       });
//     } catch (e) {
//       const err = e as Error | AxiosError<{ error: string }>;
//       handleServerNetworkError(err, thunkAPI.dispatch);
//       return thunkAPI.rejectWithValue({
//         errors: "Invalid email or password",
//       });
//     } finally {
//       thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
//     }
//   }
// );

const slice = createSlice({
  name: "cart",
  initialState: {
    isDiscountUse: false,
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

    applyPromocodeAC(state, action: PayloadAction<{ discont: number }>) {
      state.ordersInCart.map(
        (el) =>
          (el.totalPrice =
            el.totalPrice - (el.totalPrice * action.payload.discont) / 100)
      );
      state.isDiscountUse = true;
    },

    delPromocodeAC(state, action: PayloadAction<{ discont: number }>) {
      state.isDiscountUse = false;
    },

    setOrdersToCartAC(
      state,
      action: PayloadAction<{ order: OrderType<OrderResponseType> }>
    ) {
      // state.ordersInCart = [];
      // state.orderNums = 0;
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
      // state.orderNums = 0;
    },
  },
  extraReducers(builder) {},
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
  count: number;
  fuel: string;
  gear: string;
  grade: number;
  image: string;
  inStore: boolean;
  model: string;
  price: number;
  year: number;
};
