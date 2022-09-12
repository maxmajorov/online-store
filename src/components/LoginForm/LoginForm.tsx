import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginTC } from "../../store/reducers/auth-reducer";
import { isLoggedInSelector } from "../../store/reducers/auth-reducer";

type FormikValuesTypes = {
  email: string;
  password: string;
  rememberMe: false;
};

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const isLoggedIn = useAppSelector(isLoggedInSelector);

  type FormikErrorType = {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };

  const formik = useFormik({
    initialValues: {
      email: "free@samuraijs.com",
      password: "free",
      rememberMe: false,
    },

    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length <= 2) {
        errors.password = "Invalid values => less then 3 symbols";
      }

      return errors;
    },

    onSubmit: async (
      values: FormikValuesTypes,
      formikHelpers: FormikHelpers<FormikValuesTypes>
    ) => {
      const response = await dispatch(loginTC(values));
      // response ==>>> action

      if (loginTC.rejected.match(response)) {
        if (response.payload?.fieldsErrors?.length) {
          const err = response.payload?.fieldsErrors[0];
          formikHelpers.setFieldError("email", err); // проверить что приходит в fieldErrors
        }
      }

      formik.resetForm();
    },
  });

  return isLoggedIn ? (
    <> {navigate("/")}</>
  ) : (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a
                  href={"https://social-network.samuraijs.com/"}
                  target={"_blank"}
                >
                  {" "}
                  here
                </a>
              </p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                // name="email"
                // onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                // value={formik.values.email}
                // Взамен одна строчка
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
