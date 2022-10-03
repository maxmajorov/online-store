import React, { useState } from "react";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import classes from "./Cart.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  applyPromocodeAC,
  delPromocodeAC,
  isDiscountUseSelector,
  ordersInCartSelector,
  OrderResponseType,
  removeOrderFromCartAC,
  totalPriceSelector,
  OrderType,
} from "../../store/reducers/cart-reducer";
import { Counter } from "../common/counter/Counter";
import { useNavigate } from "react-router-dom";
import { Promocodes } from "../../const";
import { setAppErrorAC } from "../../store/reducers/app-reducer";

interface Data {
  id: string;
  name: string;
  status: number;
  count: number;
  price: number;
  totalPrice: number;
  deleteItem: string;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  textAlign: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    textAlign: "center",
    label: "Product name",
  },
  {
    id: "status",
    textAlign: "center",
    label: "Status",
  },
  {
    id: "price",
    textAlign: "center",
    label: "Price",
  },
  {
    id: "count",
    textAlign: "center",
    label: "Count",
  },
  {
    id: "totalPrice",
    textAlign: "center",
    label: "Total",
  },
  {
    id: "deleteItem",
    textAlign: "center",
    label: "   ",
  },
];

const EnhancedTableHead: React.FC = () => {
  return (
    <TableHead style={{ backgroundColor: "#EDEDF0" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.textAlign}
            padding="normal"
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

type TableBodyType = {
  order: OrderType<OrderResponseType>;
};

const EnhancedTableBody: React.FC<TableBodyType> = ({ order }) => {
  const [count, setCount] = useState(1);

  const isDiscountUse = useAppSelector(isDiscountUseSelector);

  const dispatch = useAppDispatch();

  const deleteItemHandler = (id: string, price: number) => {
    dispatch(removeOrderFromCartAC({ id, price }));
    console.log("del", id);
  };

  return (
    <TableRow hover key={order.data.id}>
      <TableCell>
        <div className={classes.productItem}>
          <img src={order.data.image} alt="rc-car" style={{ width: "140px" }} />
          <div className={classes.productItem_description}>
            <div className={classes.item_title}>
              {`${order.data.brand} ${order.data.model}, ${order.data.year}`}
            </div>
            <div className={classes.item_title}>Scale: {order.data.scale}</div>
          </div>
        </div>
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "status")?.textAlign}
      >
        {order.data.inStore && <DoneIcon color="success" />}
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "price")?.textAlign}
      >
        {!isDiscountUse ? (
          <div className={classes.productPrice}>${order.data.price}</div>
        ) : (
          <div>
            <div className={classes.productPrice_start}>
              ${order.data.price}
            </div>
            <div className={classes.productPrice_end}>
              ${order.totalPrice.toFixed(2)}
            </div>
          </div>
        )}
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "count")?.textAlign}
      >
        <Counter count={count} setCount={setCount} id={order.data.id} />
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "totalPrice")?.textAlign}
        width={"150px"}
      >
        <span className={classes.productPrice}>
          ${(order.totalPrice * count).toFixed(2)}
        </span>
      </TableCell>
      <TableCell
        align={headCells.find((cell) => cell.id === "deleteItem")?.textAlign}
      >
        <IconButton
          aria-label="delete"
          onClick={() => deleteItemHandler(order.data.id, order.data.price)}
        >
          <ClearIcon color={"error"} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const Cart: React.FC = React.memo(() => {
  const [promocode, setPromocode] = useState("");

  const ordersList = useAppSelector(ordersInCartSelector);
  const totalPrice = useAppSelector(totalPriceSelector);
  const isDiscountUse = useAppSelector(isDiscountUseSelector);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const applyPromocodeHandler = () => {
    if (promocode in Promocodes) {
      const [code, discount] = Object.values(Promocodes)
        .filter((el) => el.includes(promocode))
        .join()
        .split("/");

      dispatch(applyPromocodeAC({ discount: +discount }));
    } else {
      dispatch(setAppErrorAC({ error: "Promo code not found" }));
    }
  };

  const delPromocodeHandler = () => {
    dispatch(delPromocodeAC());
  };

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.heading}>MY CART</h3>
      {ordersList.length ? (
        <>
          <TableContainer className={classes.tableContainer}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead />
              <TableBody>
                {ordersList.map((order) => (
                  <EnhancedTableBody order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.orderingProcess}>
            <Link
              onClick={() => navigate("/catalog")}
              style={{ cursor: "pointer" }}
            >
              Back to store
            </Link>
            <div className={classes.promoCode}>
              <span className={classes.promoCode_text}>Enter Promo Code</span>
              <div className={classes.promocode_field}>
                {isDiscountUse ? (
                  <Button variant={"contained"} onClick={delPromocodeHandler}>
                    delete this promo
                  </Button>
                ) : (
                  <>
                    <TextField
                      value={promocode}
                      onChange={(e) => setPromocode(e.currentTarget.value)}
                      variant="outlined"
                      size="small"
                    />
                    <Button
                      variant={"contained"}
                      onClick={applyPromocodeHandler}
                      disabled={isDiscountUse}
                    >
                      Apply
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className={classes.totalPrice}>
              <div className={classes.totalPrice_text}>
                Total: ${totalPrice}
              </div>
              <Button variant={"contained"}>Proceed To Checkout</Button>
            </div>
          </div>
        </>
      ) : (
        <div className={classes.notification}>Orders not found...</div>
      )}
    </div>
  );
});
