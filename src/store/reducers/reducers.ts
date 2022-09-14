import { combineReducers } from "redux";
import { appReducer } from "./app-reducer";
import { authReducer } from "./auth-reducer";
import { productsReducer } from "./products-reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  products: productsReducer,
});
