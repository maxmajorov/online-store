import React, { useState } from "react";
import { Container } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { Cart } from "../components/cart/Cart";
import { OnlineStore } from "../components/onlineStore/OnlineStore";
import { ErrorSnackbar } from "../components/common/ErrorSnackbar/ErrorSnackbar";
import { Header } from "../components/common/header/Header";
import { WithLayout } from "../components/common/withLayout/WithLayout";
import { Chat } from "../components/chat/Chat";
import { MainPage } from "../components/mainPage/MainPage";
import "./App.css";
import Error404 from "../components/error404/Error404";
import { Footer } from "../components/common/footer/Footer";

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
                <MainPage />
              </WithLayout>
            }
          />
          <Route
            path="/catalog"
            element={
              <WithLayout>
                <OnlineStore />
              </WithLayout>
            }
          />
          <Route
            path="/retro-cars"
            element={
              <WithLayout>
                <OnlineStore />
              </WithLayout>
            }
          />
          <Route
            path="/cart"
            element={
              <WithLayout>
                <Cart />
              </WithLayout>
            }
          />
          <Route
            path="/*"
            element={
              <WithLayout>
                <Error404 />
              </WithLayout>
            }
          />
        </Routes>
      </Container>
      <Footer open={open} setOpen={setOpen} />

      {!open ? (
        <div className="chatIcon" onClick={() => setOpen(!open)}>
          Chat with us
        </div>
      ) : (
        <div>
          <div className="closeIcon" onClick={() => setOpen(!open)}>
            <IconButton size={"large"} style={{ color: "white" }}>
              <CloseOutlinedIcon fontSize="inherit" />
            </IconButton>
          </div>
          <Chat active={open} />
        </div>
      )}
    </div>
  );
};
