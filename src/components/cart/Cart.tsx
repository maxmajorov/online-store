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
import classes from "./Cart.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  ordersInCartSelector,
  OrderType,
  removeOrderFromCartAC,
} from "../../store/reducers/cart-reducer";
import { Counter } from "../common/counter/Counter";

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
    <TableHead style={{ backgroundColor: "lightGray" }}>
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
  order: OrderType;
};

const EnhancedTableBody: React.FC<TableBodyType> = ({ order }) => {
  const [count, setCount] = useState(1);

  const dispatch = useAppDispatch();

  const deleteItemHandler = (id: string, price: number) => {
    dispatch(removeOrderFromCartAC({ id, price }));
    console.log("del", id);
  };

  return (
    <TableRow hover key={order.id}>
      <TableCell>
        <div className={classes.productItem}>
          <img src={order.image} alt="rc-car" style={{ width: "140px" }} />
          <div className={classes.productItem_description}>
            <div className={classes.item_title}>
              {`${order.brand} ${order.model}, ${order.year}`}
            </div>
            <div className={classes.item_title}>Scale: {order.scale}</div>
          </div>
        </div>
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "status")?.textAlign}
      >
        {order.inStore && <DoneIcon color="success" />}
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "price")?.textAlign}
      >
        {order.price}
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "count")?.textAlign}
      >
        <Counter count={count} setCount={setCount} />
      </TableCell>
      <TableCell
        padding="normal"
        align={headCells.find((cell) => cell.id === "totalPrice")?.textAlign}
        width={"150px"}
      >
        <span className={classes.productPrice}>
          {(order.price * count).toFixed(2)}
        </span>
      </TableCell>
      <TableCell
        align={headCells.find((cell) => cell.id === "deleteItem")?.textAlign}
      >
        <IconButton
          aria-label="delete"
          onClick={() => deleteItemHandler(order.id, order.price)}
        >
          <ClearIcon color={"error"} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export const Cart: React.FC = React.memo(() => {
  const ordersList = useAppSelector(ordersInCartSelector);

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.heading}>MY CART</h3>
      <TableContainer className={classes.tableContainer}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <EnhancedTableHead />
          <TableBody>
            {ordersList.length ? (
              ordersList.map((order) => <EnhancedTableBody order={order} />)
            ) : (
              <div>Orders not found...</div> //Стилизовать!!!
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});
