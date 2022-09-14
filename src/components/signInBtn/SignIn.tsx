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

export const SignIN: React.FC = (props) => {
  const [open, setOpen] = useState(false);
  const [authing, setAuthing] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const auth = getAuth();

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
    const { email, password } = data;
    console.log(data);
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log(data.user.uid);
      setIsAuth(!isAuth);
    } catch (error: any) {
      console.log(error.message);
      // throw error;
    }
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
      {!isAuth ? (
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
        authing={authing}
        signInWithEmail={signInWithEmail}
        signInWithGoogle={signInWithGoogle}
      />
    </div>
  );
};
