import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers/reducers";

// ==== CREATE STORE ====

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(thunkMiddleware),
});

export type RootStateType = ReturnType<typeof store.getState>;

// ==== DISPATCH & SELECTOR TYPES ====

export type AppDispatchType = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// ==== THUNKS TYPES

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  // AppRootActionsType
  any
>;

//@ts-ignore
window.store = store;

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./reducers/reducers", () => {
    store.replaceReducer(rootReducer);
  });
}
