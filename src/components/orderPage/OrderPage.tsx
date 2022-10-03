import React, { useState } from "react";
import { useFormik } from "formik";
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
import classes from "./OrderPage.module.scss";
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

import { useNavigate } from "react-router-dom";

import { setAppErrorAC } from "../../store/reducers/app-reducer";

type OrderPageType = {
  isMakeOrder: boolean;
};

export const OrderPage: React.FC<OrderPageType> = React.memo(
  ({ isMakeOrder }) => {
    const ordersList = useAppSelector(ordersInCartSelector);
    const totalPrice = useAppSelector(totalPriceSelector);
    const isDiscountUse = useAppSelector(isDiscountUseSelector);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const formik = useFormik({
      initialValues: {
        city: "",
        delivery: true,
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

        if (!values.floor) {
          errors.floor = "Required";
        }

        if (!values.flat) {
          errors.flat = "Required";
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
        // console.log(JSON.stringify(values, null, 2));
        // setBtnDisable(true);
        // axios
        //   .post("https://gmail-smtp-nodejs.herokuapp.com/send-message", values)
        //   .then((res) => {
        //     setStatus(res.data);
        //     // alert("Your message has been send");
        //     setBtnDisable(false);
        //   });

        formik.resetForm();
      },
    });

    return (
      <div
        className={classes.wrapper}
        style={isMakeOrder ? { display: "block" } : { display: "none" }}
      >
        <h3 className={classes.heading}>Delivery</h3>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div className={classes.formRow}>
            <div className={classes.col_6}>
              <div className={classes.formGroup}>
                <input
                  id="sender"
                  type="text"
                  name="sender"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                  className={classes.formInput}
                />
                {/* {formik.touched.sender && formik.errors.sender ? (
                  <div className={classes.errorMessage}>
                    {formik.errors.sender}
                  </div>
                ) : null} */}
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className={classes.formInput}
                />
                {/* {formik.touched.phone && formik.errors.phone ? (
                  <div
                    style={{ top: "145px" }}
                    className={classes.errorMessage}
                  >
                    {formik.errors.phone}
                  </div>
                ) : null} */}
              </div>
            </div>
            <div className={classes.col_6}>
              <div className={classes.formGroup}>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  value={formik.values.deliveryTime}
                  className={classes.formInput}
                />
                {/* {formik.touched.email && formik.errors.email ? (
                  <div className={classes.errorMessage}>
                    {formik.errors.email}
                  </div>
                ) : null} */}
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className={classes.formInput}
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {/* {formik.touched.subject && formik.errors.subject ? (
                  <div
                    style={{ top: "145px" }}
                    className={classes.errorMessage}
                  >
                    {formik.errors.subject}
                  </div>
                ) : null} */}
              </div>
            </div>
            <div className={classes.col_12}>
              <div className={classes.formGroup}>
                <textarea
                  id="textMessage"
                  name="textMessage"
                  placeholder="Your message"
                  className={classes.formInput}
                  onChange={formik.handleChange}
                  value={formik.values.textMessage}
                />
                {/* {formik.touched.textMessage && formik.errors.textMessage ? (
                  <div className={classes.errorMessage}>
                    {formik.errors.textMessage}
                  </div>
                ) : null} */}
              </div>
            </div>
            <div className={classes.col_12}>
              <Button>Send request</Button>
            </div>
          </div>
        </form>
        <h3 className={classes.heading}>Payment</h3>
      </div>
    );
  }
);

type FormikErrorType = {
  city?: string;
  delivery?: string;
  street?: string;
  home?: string;
  floor?: string;
  flat?: string;
  deliveryTime?: string;
  phone?: string;
  textMessage?: string;
};
