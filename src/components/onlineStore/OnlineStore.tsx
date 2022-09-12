import React, { useEffect } from "react";
import defProdImg from "../../assets/img/defProdLogo.png";
import { Button } from "@mui/material";
import { Grade } from "../grade/Grade";
import classes from "./OnlineStore.module.scss";

type ProductsType = {
  id: string;
  image?: string;
  title: string;
  price: number;
  description: string;
  grade: number;
};

const productsList: Array<ProductsType> = [
  {
    id: "1",
    title: "Vintage Typewritter to post awesome stories",
    price: 49.5,
    description: "Eligible for Shipping To Mars or something else",
    grade: 4,
  },
  {
    id: "2",
    title: "Vintage Typewritter to post awesome stories",
    price: 9.5,
    description: "Eligible for Shipping To Mars or something else",
    grade: 5,
  },
  {
    id: "3",
    title: "Vintage Typewritter to post awesome stories",
    price: 34.5,
    description: "Eligible for Shipping To Mars or something else",
    grade: 0,
  },
  {
    id: "4",
    title: "Vintage Typewritter to post awesome stories",
    price: 23.5,
    description: "Eligible for Shipping To Mars or something else",
    grade: 2,
  },
  {
    id: "5",
    title: "Vintage Typewritter to post awesome stories",
    price: 41.1,
    description: "Eligible for Shipping To Mars or something else",
    grade: 1,
  },
  {
    id: "6",
    title: "Vintage Typewritter to post awesome stories",
    price: 55.2,
    description: "Eligible for Shipping To Mars or something else",
    grade: 5,
  },
];

export const OnlineStore: React.FC = React.memo(() => {
  return (
    <div className={classes.wrapper}>
      <h3>PRODUCTS</h3>

      <div className={classes.productsList}>
        {productsList.map((pr) => (
          <div key={pr.id} className={classes.item}>
            <img src={pr.image ? pr.image : defProdImg} />
            <div className={classes.item_title}>{pr.title}</div>
            <div className={classes.item_price}>${pr.price}</div>
            <div className={classes.item_description}>{pr.description}</div>
            <div className={classes.controls}>
              <Grade value={pr.grade} />
              <Button variant="outlined" style={{ display: "block" }}>
                buy
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
