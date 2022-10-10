import React, { useState } from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import classes from "./SignInForm.module.scss";

type TSignInFormModal = {
  active: boolean;
  setActive: (value: boolean) => void;
  status: string;
  signInWithEmail: (data: { email: string; password: string }) => void;
  signInWithGoogle: () => void;
};

export const SignInFormModal: React.FC<TSignInFormModal> = ({
  active,
  setActive,
  status,
  signInWithEmail,
  signInWithGoogle,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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

      return errors;
    },

    onSubmit: (values: FormikValuesTypes) => {
      console.log(values);
      signInWithEmail(values);
      // setActive(!active);
      formik.resetForm();
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div
      className={active ? `${classes.modal} ${classes.active}` : classes.modal}
      onClick={() => setActive(!active)}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.heading}>
          <h2 className={classes.title}>Sign in</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <FormGroup>
            <FormControl sx={{ m: 2, width: "300px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                placeholder={"Enter email"}
                label="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </FormControl>
            <FormControl sx={{ m: 2, width: "300px" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                placeholder={"Enter password"}
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
            </FormControl>

            <Button
              type={"submit"}
              variant={"text"}
              size={"large"}
              className={classes.btn}
              color={"primary"}
              style={{ margin: "10px 0" }}
              disabled={status === "loading"}
            >
              Login
            </Button>

            <Button
              variant={"outlined"}
              color={"primary"}
              onClick={() => signInWithGoogle()}
              disabled={status === "loading"}
              endIcon={<GoogleIcon />}
              style={{ width: "60%", margin: "auto" }}
            >
              Sign in with
            </Button>
            <div className={classes.forSignUp}>
              <span className={classes.description}>
                Don`t have an account?&ensp;
              </span>
              <Link
                // onClick={() => navigate(PATH.REGISTRATION)}
                className={classes.bottomRedirect}
              >
                Sign Up
              </Link>
            </div>
          </FormGroup>
        </form>
      </div>
    </div>
  );
};

// ==== TYPES ====

type FormikValuesTypes = {
  email: string;
  password: string;
};

type FormikErrorType = {
  email?: string;
};
