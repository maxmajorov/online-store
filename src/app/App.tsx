import React, { useEffect, useState } from "react";
import { Container, Tooltip } from "@mui/material";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Cart } from "../components/cart/Cart";
import { OnlineStore } from "../components/onlineStore/OnlineStore";
import { ErrorSnackbar } from "../components/common/ErrorSnackbar/ErrorSnackbar";
import { Header } from "../components/common/header/Header";
import { WithLayout } from "../components/common/withLayout/WithLayout";
import { Chat } from "../components/chat/Chat";

export const App = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   // dispatch(initializeAppTC());
  // }, []);

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
      {!open ? (
        <>
          <Tooltip title="Write us!">
            <div className="chatIcon" onClick={() => setOpen(!open)} />
          </Tooltip>
        </>
      ) : (
        <Chat active={open} setActive={setOpen} />
      )}
    </div>
  );
};
