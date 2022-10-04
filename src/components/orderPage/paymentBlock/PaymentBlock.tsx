import React from "react";
import { FormikProps } from "formik";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import classes from "./PaymentBlock.module.scss";
import { paymentMethods } from "../../../const";
import { FormValues } from "../OrderPage";

type PaymentBlockType = {
  formik: FormikProps<FormValues>;
};

export const PaymentBlock: React.FC<PaymentBlockType> = React.memo(
  ({ formik }) => {
    return (
      <div className={classes.paymentBlock}>
        <h4 className={classes.title}>Payment</h4>
        <FormGroup>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={formik.values.payment}
              onChange={formik.handleChange}
            >
              {paymentMethods.map((method, ind) => (
                <FormControlLabel
                  key={ind}
                  name="payment"
                  value={method}
                  control={<Radio />}
                  label={method}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </FormGroup>
      </div>
    );
  }
);
