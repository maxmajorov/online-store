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
    price: 0.0,
    orderNums: 0,
    ordersInCart: [] as Array<OrderType>,
  },

  reducers: {
    setCountAC(state, action: PayloadAction<{ id: string; count: number }>) {
      state.ordersInCart.map((el) =>
        el.id === action.payload.id ? (el.count = action.payload.count) : el
      );
    },

    setOrdersToCartAC(state, action: PayloadAction<{ order: OrderType }>) {
      state.ordersInCart.push(action.payload.order);
      state.orderNums++;
    },

    removeOrderFromCartAC(
      state,
      action: PayloadAction<{ id: string; price: number }>
    ) {
      state.ordersInCart = state.ordersInCart.filter(
        (el) => el.id !== action.payload.id
      );
      state.orderNums--;
      state.price = state.price - action.payload.price;
    },
  },
  extraReducers(builder) {},
});

export const cartReducer = slice.reducer;
export const { setCountAC, setOrdersToCartAC, removeOrderFromCartAC } =
  slice.actions;

// ==== SELECTORS ====

export const totalPriceSelector = (state: RootStateType) =>
  state.cart.ordersInCart.reduce(
    (acc, next) => acc + next.count * next.price,
    0
  );
export const ordersNumSelector = (state: RootStateType) => state.cart.orderNums;
export const ordersInCartSelector = (state: RootStateType) =>
  state.cart.ordersInCart;

// ==== TYPES ====

export type OrderType = {
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
