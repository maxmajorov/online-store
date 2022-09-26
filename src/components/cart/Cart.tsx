import React from "react";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ClearIcon from "@mui/icons-material/Clear";
import classes from "./Cart.module.scss";
import { useAppSelector } from "../../store/store";
import { ordersInCartSelector } from "../../store/reducers/cart-reducer";

interface Data {
  id: string;
  image: string;
  name: string;
  status: number;
  count: number;
  price: number;
  deleteItem: string;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  textAlign: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  sortable?: boolean;
  disablePadding: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "image",
    textAlign: "left",
    disablePadding: true,
    label: "",
  },
  {
    id: "name",
    textAlign: "left",
    disablePadding: true,
    label: "Product name",
  },
  {
    id: "status",
    textAlign: "center",
    disablePadding: false,
    label: "Status",
  },
  {
    id: "count",
    textAlign: "center",
    disablePadding: false,
    label: "Count",
  },
  {
    id: "price",
    textAlign: "center",
    disablePadding: false,
    label: "Price",
  },
  {
    id: "deleteItem",
    textAlign: "center",
    disablePadding: false,
    label: "Price",
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

export const Cart: React.FC = React.memo(() => {
  const ordersList = useAppSelector(ordersInCartSelector);

  return (
    <div className={classes.wrapper}>
      <h3>CART</h3>
      <TableContainer className={classes.tableContainer}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <EnhancedTableHead />
          <TableBody>
            {ordersList.length ? (
              ordersList.map((order, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover key={index}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align={
                        headCells.find((cell) => cell.id === "name")?.textAlign
                      }
                      style={{ paddingLeft: "15px" }}
                    >
                      {order.brand}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        // disabled={status === "loading" || card.cardsCount === 0}
                        onClick={() => {}}
                      >
                        {/* <KeyboardTabIcon /> */}
                      </IconButton>
                    </TableCell>
                    <TableCell
                      padding="normal"
                      // align={
                      // headCells.find((cell) => cell.id === "cards")?.textAlign
                      // }
                    >
                      {/* {order.cardsCount} */}
                    </TableCell>
                    <TableCell
                      padding="normal"
                      // align={
                      // headCells.find((cell) => cell.id === "update")
                      //   ?.textAlign
                      // }
                    >
                      {/* {order.updated.slice(0, 10)} */}
                    </TableCell>
                    <TableCell padding="normal" align={"center"}>
                      {/* {order.user_name} */}
                    </TableCell>
                    <TableCell align="right" style={{ display: "flex" }}>
                      <IconButton aria-label="delete">
                        <ClearIcon color={"error"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <div>Orders not found...</div> //Стилизовать!!!
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});
