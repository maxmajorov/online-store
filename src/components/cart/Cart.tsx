import React, { useCallback, useEffect } from "react";
import classes from "./Cart.module.scss";

export const Cart: React.FC = React.memo(() => {
  return (
    <div className={classes.wrapper}>
      <h3>CART</h3>
    </div>
  );
});
