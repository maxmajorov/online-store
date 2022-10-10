import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

const slice = createSlice({
  name: "products",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC(state) {
      state.isLoggedIn = true;
    },
  },
});

export const userReducer = slice.reducer;

export const { setIsLoggedInAC } = slice.actions;

// ==== SELECTORS ====

// ==== TYPES ====
