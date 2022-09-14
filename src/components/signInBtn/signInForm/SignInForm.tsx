import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import classes from "./SignInForm.module.scss";

type SignInFormModalType = {
  active: boolean;
  setActive: (value: boolean) => void;
  authing: boolean;
  signInWithEmail: (data: { email: string; password: string }) => void;
  signInWithGoogle: () => void;
};

export const SignInFormModal: React.FC<SignInFormModalType> = ({
  active,
  setActive,
  authing,
  signInWithEmail,
  signInWithGoogle,
}) => {
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

    // ?????????????????????????????????????
    onSubmit: (values: FormikValuesTypes) => {
      console.log(values);
      signInWithEmail(values);
      setActive(!active);
      formik.resetForm();
    },
  });

  // const sendUserDataHandler = () => {
  //   signInRequest(formik.values);
  //   setActive(!active);
  // };

  return (
    <div
      className={active ? `${classes.modal} ${classes.active}` : classes.modal}
      onClick={() => setActive(!active)}
    >
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Sign In</h3>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              // {...formik.getFieldProps("first_name")}
            />
          </div>
          <div>
            <label>Password: </label>
            <input {...formik.getFieldProps("password")} />
          </div>

          <div className={classes.controls}>
            <Button
              variant={"outlined"}
              type="submit"
              // onClick={sendUserDataHandler}
            >
              sign in
            </Button>
            <button
              type="button"
              onClick={() => setActive(!active)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Cancel
            </button>
          </div>
        </form>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => signInWithGoogle()}
          disabled={authing}
          endIcon={<GoogleIcon />}
        >
          Sign in with{" "}
        </Button>
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
  firstName?: string;
  lastName?: string;
  age?: string;
  phone?: string;
  email?: string;
  country?: string;
  city?: boolean;
};
