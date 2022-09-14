import React, { useState } from "react";
import Logo from "../../../assets/img/logo.svg";
import defaultAva from "../../../assets/img/def-image.png";
import { SearchInput } from "../search-input/SearchInput";
import classes from "./Header.module.scss";
import { Button } from "@mui/material";
import { LinearProgress } from "@mui/material";
import { SignIN } from "../../signInBtn/SignIn";

export const Header: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "idle">("loading");
  const [searchCustomer, setSearchCustomer] = useState<string>("");

  const onSearchHandler = () => {
    console.log("find");
  };

  return (
    <header style={{ position: "fixed", width: "100%" }}>
      <div className={classes.header}>
        <div className={classes.headerLogo}>
          <div>
            <img src={Logo} className={classes.logo} alt="logo" />
          </div>
        </div>
        <div className={classes.searchField}>
          <SearchInput
            value={searchCustomer}
            onChange={setSearchCustomer}
            onSearchHandler={onSearchHandler}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.controlsCart}>
            <Button variant="outlined">My cart</Button>
            <span className={classes.controlsCartOrders}>0</span>
          </div>
          <SignIN />

          <div className={classes.controlsAvatar}>
            <img src={defaultAva} alt="avatar" />
          </div>
        </div>
      </div>

      {status === "loading" && <LinearProgress />}
    </header>
  );
};
