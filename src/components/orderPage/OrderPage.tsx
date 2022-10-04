import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  sendOrderInfoToTelegramTC,
  totalPriceSelector,
} from "../../store/reducers/cart-reducer";
import { useNavigate } from "react-router-dom";
import { shippingCost } from "../../const";
import { ShippingBlock } from "./shippingBlock/ShippingBlock";
import classes from "./OrderPage.module.scss";
import { PaymentBlock } from "./paymentBlock/PaymentBlock";

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
        shipping: "deliveryToClient",
        pickupPoint: "Partizanskaya st, 178",
        payment: "Payment upon receipt",
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

        if (formik.values.shipping === "deliveryToClient" && !values.street) {
          errors.street = "Required";
        }

        if (formik.values.shipping === "deliveryToClient" && !values.home) {
          errors.home = "Required";
        }

        if (!values.deliveryTime) {
          errors.deliveryTime = "Required";
        }

        if (!values.phone) {
          errors.phone = "Required";
        }

        return errors;
      },

      onSubmit: (values) => {
        console.log(JSON.stringify(values, null, 2));

        let orderInfo = `<b>Order info from RS Cars store</b>\n`;
        orderInfo += `<b>Sender: </b> ${"Max"} \n`;
        orderInfo += `<b>City: </b> ${values.city} \n`;
        orderInfo += `<b>Shipping: </b> ${values.shipping} \n`;
        orderInfo += `<b>Pick up point: </b> ${values.pickupPoint} \n`;
        orderInfo += `<b>Address: </b> ${values.street}, ${values.home} ${values.floor} ${values.flat} \n`;
        orderInfo += `<b>Delivery time: </b> ${values.deliveryTime} \n`;
        orderInfo += `<b>Phone: </b> ${values.phone} \n`;
        orderInfo += `<b>Comment: </b> ${values.textMessage} \n`;

        // dispatch(sendOrderInfoToTelegramTC(orderInfo));

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
            <ShippingBlock formik={formik} />
            <PaymentBlock formik={formik} />
            {/* <h4 className={classes.title}>Shipping</h4>
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
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={formik.values.shipping}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      name="shipping"
                      value={"deliveryToClient"}
                      control={<Radio />}
                      label="Shipping to client"
                    />
                    <FormControlLabel
                      name="shipping"
                      value={"withoutDelivery"}
                      control={<Radio />}
                      label="Pick up yourself"
                    />
                  </RadioGroup>
                  {formik.values.shipping === "withoutDelivery" ? (
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={formik.values.pickupPoint}
                      onChange={formik.handleChange}
                    >
                      {pickupPoints.map((point, ind) => (
                        <FormControlLabel
                          key={ind}
                          name="pickupPoint"
                          value={point.point}
                          control={<Radio />}
                          label={point.point}
                          style={{ paddingLeft: "30px" }}
                        />
                      ))}
                    </RadioGroup>
                  ) : null}
                </FormControl>
                <FormControl
                  style={
                    formik.values.shipping === "withoutDelivery"
                      ? { display: "none" }
                      : { display: "flex" }
                  }
                  margin="normal"
                >
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
                <div
                  className={classes.inputGroup}
                  style={
                    formik.values.shipping === "withoutDelivery"
                      ? { display: "none" }
                      : { display: "flex" }
                  }
                >
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

                <FormControl margin="normal">
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
                <FormControl margin="normal">
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

                <FormControl margin="normal">
                  <TextField
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    multiline
                    rows={4}
                    {...formik.getFieldProps("textMessage")}
                  />
                </FormControl>
              </FormGroup> */}
          </div>

          <div className={classes.controlsBlock}>
            <div>
              <div>Subtotal: ${totalPrice}</div>
              <div>
                Shipping:
                {!formik.getFieldProps("deliveryToClient") ? "FREE" : "PAY"}
              </div>
              <div>Total: ${+totalPrice + shippingCost}</div>
              <Button
                type="submit"
                variant="contained"
                disabled={
                  !formik.isValid || !formik.dirty || formik.isSubmitting
                }
                style={{ marginTop: "15px" }}
                onClick={formik.submitForm}
              >
                Order
              </Button>
            </div>
          </div>
        </form>
        <div ref={makeOrderAncorRef} />
      </div>
    );
  }
);

export interface FormValues {
  city: string;
  shipping: string;
  pickupPoint: string;
  payment: string;
  street: string;
  home: string;
  floor: string;
  flat: string;
  deliveryTime: string;
  phone: string;
  textMessage: string;
}

type FormikErrorType = {
  city?: string;
  street?: string;
  home?: string;
  deliveryTime?: string;
  phone?: string;
  textMessage?: string;
};
