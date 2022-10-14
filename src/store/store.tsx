import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {
    appReducer,
    authReducer,
    cartReducer,
    chatReducer,
    locationReducer,
    userReducer,
} from './reducers';

// ==== PERSIST CONFIGS && persisted reducer ====

const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['auth'],
};

export const authPersistConfig = {
    key: 'auth',
    storage,
    blacklist: ['isSignIn'],
};

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    chat: chatReducer,
    cart: cartReducer,
    user: userReducer,
    location: locationReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// ==== CREATE STORE ====

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).prepend(thunkMiddleware),
});

export let persistor = persistStore(store);

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

// if (process.env.NODE_ENV === "development" && module.hot) {
//   module.hot.accept("./reducers/reducers", () => {
//     store.replaceReducer(persistedReducer);
//   });
// }
