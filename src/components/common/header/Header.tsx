import React, { useState } from "react";
import Logo from "../../../assets/img/logo.svg";
import { SearchInput } from "../search-input/SearchInput";
import classes from "./Header.module.css";

export const Header: React.FC = () => {
  const [searchCustomer, setSearchCustomer] = useState<string>("");

  const indicatorClassName = `${classes.indicator} ${
    true ? classes.online : classes.offline
  } `;

  const onSearchHandler = () => {
    console.log("find");
  };

  return (
    <header className={classes.header}>
      <div className={classes.headerLogo}>
        <div>
          <img src={Logo} className={classes.logo} alt="logo" />
        </div>
      </div>
      <div>
        <SearchInput
          value={searchCustomer}
          onChange={setSearchCustomer}
          onSearchHandler={onSearchHandler}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={indicatorClassName} />
      </div>
    </header>
  );
};
