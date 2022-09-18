import React, { useState } from "react";
import Button from "@mui/material/Button";
import { SignInFormModal } from "./signInForm/SignInForm";
import {
  isSignInSelector,
  logoutTC,
  signInWithEmailAndPasswordTC,
  signInWithGoogleTC,
} from "../../store/reducers/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { appStatusSelector } from "../../store/reducers/app-reducer";

export const SignIN: React.FC = (props) => {
  const [open, setOpen] = useState(false);

  const status = useAppSelector(appStatusSelector);
  const isSignIn = useAppSelector(isSignInSelector);

  const dispatch = useAppDispatch();

  const signInWithGoogle = () => {
    const result = dispatch(signInWithGoogleTC());

    result.then(
      (res) => res.meta.requestStatus === "fulfilled" && setOpen(!open)
    );
  };

  const signInWithEmail = (data: { email: string; password: string }) => {
    const result = dispatch(signInWithEmailAndPasswordTC(data));

    result.then(
      (res) => res.meta.requestStatus === "fulfilled" && setOpen(!open)
    );
  };

  const signOutHandler = () => {
    dispatch(logoutTC());
  };

  return (
    <div>
      <SignInFormModal
        active={open}
        setActive={setOpen}
        status={status}
        signInWithEmail={signInWithEmail}
        signInWithGoogle={signInWithGoogle}
      />
      {!isSignIn ? (
        <Button
          variant={"contained"}
          color={"primary"}
          disabled={status === "loading"}
          onClick={() => setOpen(!open)}
        >
          Sign in
        </Button>
      ) : (
        <Button
          variant={"outlined"}
          onClick={signOutHandler}
          disabled={status === "loading"}
        >
          Sign out
        </Button>
      )}
    </div>
  );
};
