import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { SignInFormModal } from "./signInForm/SignInForm";
import {
  isSignInWithEmailAndPasswordSelector,
  signInWithEmailAndPasswordTC,
} from "../../store/reducers/auth-reducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { appStatusSelector } from "../../store/reducers/app-reducer";

export const SignIN: React.FC = (props) => {
  const [open, setOpen] = useState(false);

  const auth = getAuth();

  const status = useAppSelector(appStatusSelector);

  const isSignInWithEmailAndPassword = useAppSelector(
    isSignInWithEmailAndPasswordSelector
  );

  const dispatch = useAppDispatch();

  const signInWithGoogle = async () => {
    setAuthing(true);

    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(user.uid);
      setIsAuth(!isAuth);
      setOpen(!open);
    } catch (error: any) {
      console.log(error.message);
      // throw error;
    } finally {
      setAuthing(false);
    }
  };

  const signInWithEmail = async (data: { email: string; password: string }) => {
    dispatch(signInWithEmailAndPasswordTC(data));
  };

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      setIsAuth(!isAuth);
    } catch (error: any) {
      console.log(error.message);
      // throw error;
    } finally {
      setAuthing(false);
    }
  };

  return (
    <div>
      {!isSignInWithEmailAndPassword ? (
        <Button
          variant={"contained"}
          color={"primary"}
          disabled={authing}
          onClick={() => setOpen(!open)}
        >
          Sign in
        </Button>
      ) : (
        <Button
          variant={"outlined"}
          onClick={signOutHandler}
          disabled={authing}
        >
          Sign out
        </Button>
      )}

      <SignInFormModal
        active={open}
        setActive={setOpen}
        status={status}
        signInWithEmail={signInWithEmail}
        signInWithGoogle={signInWithGoogle}
      />
    </div>
  );
};
