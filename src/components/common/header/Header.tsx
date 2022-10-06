import React, { useState } from "react";
import Logo from "../../../assets/img/logo.jpg";
import defaultAva from "../../../assets/img/def-image.png";
import { SearchInput } from "../search-input/SearchInput";
import { LinearProgress } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { SignIN } from "../../signInBtn/SignIn";
import { Menu } from "../../common/menu/Menu";
import { appStatusSelector } from "../../../store/reducers/app-reducer";
import { useAppSelector } from "../../../store/store";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import classes from "./Header.module.scss";
import { currentUserSelector } from "../../../store/reducers/auth-reducer";
import {
  ordersNumSelector,
  totalPriceSelector,
} from "../../../store/reducers/cart-reducer";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const [searchCustomer, setSearchCustomer] = useState<string>("");

  const status = useAppSelector(appStatusSelector);
  const currentUser = useAppSelector(currentUserSelector);
  const totalPrice = useAppSelector(totalPriceSelector);
  const orderNum = useAppSelector(ordersNumSelector);

  const navigate = useNavigate();

  const onSearchHandler = () => {
    console.log("find");
  };

  return (
    <header style={{ position: "fixed", width: "100%", zIndex: 100 }}>
      <div className={classes.header}>
        <div className={classes.headerLogo}>
          <img src={Logo} className={classes.logo} alt="logo" />
        </div>
        <div className={classes.searchField}>
          <SearchInput
            value={searchCustomer}
            onChange={setSearchCustomer}
            onSearchHandler={onSearchHandler}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.controlsAvatar}>
            <Avatar
              src={currentUser.photoURL ? currentUser.photoURL : defaultAva}
              alt="avatar"
            />
          </div>
          <div className={classes.controlsButtons}>
            <div>
              {currentUser.displayName ? currentUser.displayName : "HELLO"}
            </div>
            <SignIN />
          </div>

          <div
            className={classes.controlsCart}
            onClick={() => navigate("cart")}
          >
            <IconButton color="primary" component="label">
              <AddShoppingCartIcon fontSize="large" />
            </IconButton>
            <span className={classes.controlsCartOrders}>{orderNum}</span>
          </div>
          <div>
            Shopping Cart
            <div>
              <b>${totalPrice}</b>
            </div>
          </div>
        </div>
      </div>
      <Menu />

      {status === "loading" && <LinearProgress />}
    </header>
  );
};
