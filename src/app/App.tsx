import React, { useEffect } from "react";
import { Container } from "@mui/material";
import "./App.css";
import { ErrorSnackbar } from "../components/ErrorSnackbar/ErrorSnackbar";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  appInitializeSelector,
  initializeAppTC,
} from "../store/reducers/app-reducer";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Cart } from "../components/cart/Cart";
import { OnlineStore } from "../components/onlineStore/OnlineStore";
import { Header } from "../components/header/Header";

export const App = () => {
  const isInitialized = useAppSelector(appInitializeSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return <>{/* <TodoAppBar /> */}</>;
  }

  return (
    <div className="App">
      <Header />
      <ErrorSnackbar />
      <Container fixed>
        <Routes>
          <Route path="/" element={<OnlineStore />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </Container>
    </div>
  );
};
