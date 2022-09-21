import React from "react";
import defImg from "../../assets/img/default-image.png";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../..";
import { useCollectionData } from "react-firebase-hooks/firestore";
import classes from "./OnlineStore.module.scss";

export const OnlineStore: React.FC = React.memo(() => {
  const [products] = useCollectionData(query(collection(db, "products")));

  // add to navigate state form size models for view on heding
  return (
    <div className={classes.wrapper}>
      <h3>Car models 1:10 </h3>

      <div>sorting... add in future)))</div>
      <div className={classes.productsList}>
        {products &&
          products.map((model, ind) => (
            <div key={ind} className={classes.item}>
              <div className={classes.item_image}>
                <img
                  src={model.image ? model.image : defImg}
                  alt={"product-item"}
                />
              </div>

              <div
                className={classes.item_title}
              >{`${model.brand} ${model.model}, ${model.year}`}</div>
              <div
                className={classes.item_description}
              >{`${model.body} / ${model.gear} / ${model.fuel}`}</div>
              <div className={classes.item_inStore}>
                In stock
                {model.inStore ? (
                  <DoneIcon color="success" />
                ) : (
                  <CloseIcon color="error" />
                )}
              </div>
              <div className={classes.item_price}>${model.price}</div>

              <div className={classes.controls}>
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
