import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import classes from "./OrderPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  sendOrderInfoToTelegramTC,
  totalPriceSelector,
} from "../../store/reducers/cart-reducer";
import { useNavigate } from "react-router-dom";
import { deliveryTimes } from "../../const";

type OrderPageType = {
  isMakeOrder: boolean;
};

export const OrderPage: React.FC<OrderPageType> = React.memo(
  ({ isMakeOrder }) => {
    const totalPrice = useAppSelector(totalPriceSelector);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const formik = useFormik({
      initialValues: {
        city: "",
        deliveryToClient: true,
        withoutDelivery: false,
        street: "",
        home: "",
        floor: "",
        flat: "",
        deliveryTime: "",
        phone: "",
        textMessage: "",
      },

      validate: (values) => {
        const errors: FormikErrorType = {};

        if (!values.city) {
          errors.city = "Required";
        }

        if (!values.street) {
          errors.street = "Required";
        }

        if (!values.home) {
          errors.home = "Required";
        }

        if (!values.deliveryTime) {
          errors.deliveryTime = "Required";
        }

        if (!values.phone) {
          errors.phone = "Required";
        }

        if (!values.textMessage) {
          errors.textMessage = "Required";
        }

        return errors;
      },

      onSubmit: (values) => {
        console.log(JSON.stringify(values, null, 2));

        let orderInfo = `<b>Order info from RS Cars store</b>\n`;
        orderInfo += `<b>Sender: </b> ${"Max"} \n`;
        orderInfo += `<b>City: </b> ${values.city} \n`;
        orderInfo += `<b>Shipping: </b> ${
          values.deliveryToClient ? "Yes" : "No"
        } \n`;
        orderInfo += `<b>Address: </b> ${values.street}, ${values.home} ${values.floor} ${values.flat} \n`;
        orderInfo += `<b>Delivery time: </b> ${values.deliveryTime} \n`;
        orderInfo += `<b>Phone: </b> ${values.phone} \n`;
        orderInfo += `<b>Comment: </b> ${values.textMessage} \n`;

        dispatch(sendOrderInfoToTelegramTC(orderInfo));

        formik.resetForm();
      },
    });

    useEffect(() => {
      makeOrderAncorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, [isMakeOrder]);

    const makeOrderAncorRef = useRef<HTMLDivElement>(null);

    return (
      <div
        className={classes.wrapper}
        style={isMakeOrder ? { display: "block" } : { display: "none" }}
      >
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div className={classes.orderDetailsBlocks}>
            <div className={classes.deliveryBlock}>
              <h4 className={classes.title}>Shipping</h4>
              <FormGroup>
                <FormControl>
                  <TextField
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                    size="small"
                    {...formik.getFieldProps("city")}
                  />
                  {formik.touched.city && formik.errors.city ? (
                    <div className={classes.errorMessage}>
                      {formik.errors.city}
                    </div>
                  ) : null}
                </FormControl>
                <FormControl>
                  <FormControlLabel
                    label={"Shipping to client"}
                    control={
                      <Checkbox {...formik.getFieldProps("deliveryToClient")} />
                    }
                    style={{ paddingLeft: "10px" }}
                  />
                </FormControl>
                <FormControl>
                  <FormControlLabel
                    label={"Pick up yourself"}
                    control={
                      <Checkbox {...formik.getFieldProps("withoutDelivery")} />
                    }
                    style={{ paddingLeft: "10px", marginBottom: "10px" }}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Street"
                    variant="outlined"
                    size="small"
                    {...formik.getFieldProps("street")}
                  />
                  {formik.touched.city && formik.errors.street ? (
                    <div className={classes.errorMessage}>
                      {formik.errors.street}
                    </div>
                  ) : null}
                </FormControl>
                <div className={classes.inputGroup}>
                  <TextField
                    id="outlined-basic"
                    label="Home"
                    variant="outlined"
                    size="small"
                    style={{ width: "100px", marginRight: "10px" }}
                    {...formik.getFieldProps("home")}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Floor"
                    variant="outlined"
                    size="small"
                    style={{ width: "100px", marginRight: "10px" }}
                    {...formik.getFieldProps("floor")}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Flat"
                    variant="outlined"
                    size="small"
                    style={{ width: "100px" }}
                    {...formik.getFieldProps("flat")}
                  />
                </div>

                <FormControl>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    size="small"
                    {...formik.getFieldProps("deliveryTime")}
                  >
                    {deliveryTimes.map((option, ind) => (
                      <MenuItem key={ind} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                  {formik.touched.deliveryTime && formik.errors.deliveryTime ? (
                    <div
                      style={{ top: "145px" }}
                      className={classes.errorMessage}
                    >
                      {formik.errors.deliveryTime}
                    </div>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Phone"
                    variant="outlined"
                    size="small"
                    {...formik.getFieldProps("phone")}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className={classes.errorMessage}>
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    multiline
                    rows={4}
                    {...formik.getFieldProps("textMessage")}
                  />
                </FormControl>
              </FormGroup>
            </div>
            <div className={classes.paymentBlock}>
              <h4 className={classes.title}>Payment</h4>
            </div>
          </div>

          <div className={classes.controlsBlock}>
            <div>
              <div>Subtotal: ${totalPrice}</div>
              <div>
                Shipping:{" "}
                {!formik.getFieldProps("deliveryToClient") ? "FREE" : "PAY"}
              </div>
              <Button
                type="submit"
                variant="outlined"
                style={{ marginTop: "15px" }}
              >
                Send request
              </Button>
            </div>
          </div>
        </form>
        <div ref={makeOrderAncorRef}>HIDDEN</div>
      </div>
    );
  }
);

type FormikErrorType = {
  city?: string;
  street?: string;
  home?: string;
  deliveryTime?: string;
  phone?: string;
  textMessage?: string;
};
