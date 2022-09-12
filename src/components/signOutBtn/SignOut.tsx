import React, { useState } from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginTC } from "../../store/reducers/auth-reducer";
import { isLoggedInSelector } from "../../store/reducers/auth-reducer";

import { getAuth, signOut } from "firebase/auth";

export const SignOut: React.FC = (props) => {
  const auth = getAuth();
  console.log(auth);

  return (
    <>
      <Button variant={"outlined"} onClick={() => signOut(auth)}>
        Sign out
      </Button>
    </>
  );
};
