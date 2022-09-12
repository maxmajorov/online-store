import React, { useEffect } from "react";
import { Container } from "@mui/material";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  appInitializeSelector,
  initializeAppTC,
} from "../store/reducers/app-reducer";
import { Cart } from "../components/cart/Cart";
import { OnlineStore } from "../components/onlineStore/OnlineStore";
import { ErrorSnackbar } from "../components/common/ErrorSnackbar/ErrorSnackbar";
import { Header } from "../components/common/header/Header";
import { WithLayout } from "../components/common/withLayout/WithLayout";

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
          <Route
            path="/"
            element={
              <WithLayout>
                <OnlineStore />
              </WithLayout>
            }
          />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/login" element={<LoginForm />} /> */}
        </Routes>
      </Container>
    </div>
  );
};
