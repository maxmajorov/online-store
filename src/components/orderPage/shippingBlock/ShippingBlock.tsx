import React from "react";
import { FormikProps } from "formik";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import classes from "./ShippingBlock.module.scss";
import { deliveryTimes, pickupPoints } from "../../../const";
import { FormValues } from "../OrderPage";

type ShippingBlockType = {
  formik: FormikProps<FormValues>;
};

export const ShippingBlock: React.FC<ShippingBlockType> = React.memo(
  ({ formik }) => {
    return (
      <div className={classes.shippingBlock}>
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
              <div className={classes.errorMessage}>{formik.errors.city}</div>
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
              <div className={classes.errorMessage}>{formik.errors.street}</div>
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
              label="Select time"
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
              <div style={{ top: "145px" }} className={classes.errorMessage}>
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
              <div className={classes.errorMessage}>{formik.errors.phone}</div>
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
        </FormGroup>
      </div>
    );
  }
);
