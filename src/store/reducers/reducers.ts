import { combineReducers } from "redux";
import { chatReducer } from ".";
import { cartReducer } from "./cart-reducer";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { productsReducer } from "./products-reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  chat: chatReducer,
  cart: cartReducer,
  products: productsReducer,
});
