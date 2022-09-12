import React, { useState } from "react";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { FormikHelpers, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { loginTC } from "../../store/reducers/auth-reducer";
import { isLoggedInSelector } from "../../store/reducers/auth-reducer";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const SignIN: React.FC = (props) => {
  const [authing, setAuthing] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(auth);
  const signInWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then((res) => {
        console.log(res.user.uid);
        setIsAuth(!isAuth);
        navigate("/");
      })
      .catch((err) => {
        console.log("signIn err", err);
        setAuthing(false);
      });
  };

  const signOutHandler = async () => {
    const result = await signOut(auth);
    console.log(result);
    // setIsAuth(!isAuth);
  };

  return (
    <>
      {isAuth ? (
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => signInWithGoogle()}
          disabled={authing}
          endIcon={<GoogleIcon />}
        >
          Sign in with
        </Button>
      ) : (
        <Button variant={"outlined"} onClick={signOutHandler}>
          Sign out
        </Button>
      )}
    </>
  );
};
