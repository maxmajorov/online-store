import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { SignInFormModal } from "./signInForm/SignInForm";

export const SignIN: React.FC = (props) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [authing, setAuthing] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  console.log(auth);

  const signInWithGoogle = async () => {
    setAuthing(true);

    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(user.uid);
      setIsAuth(!isAuth);
      navigate("/");
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
      const result = await auth.signOut();
      // setIsAuth(!isAuth);
      console.log(result);
    } catch (error: any) {
      console.log(error.message);
      // throw error;
    } finally {
      setAuthing(false);
    }
  };

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   return () => unsub();
  // });

  // return (
  //   <>
  //     {!isAuth ? (
  //       <Button
  //         variant={"contained"}
  //         color={"primary"}
  //         onClick={() => signInWithGoogle()}
  //         disabled={authing}
  //         endIcon={<GoogleIcon />}
  //       >
  //         Sign in with
  //       </Button>
  //     ) : (
  //       <Button variant={"outlined"} onClick={signOutHandler}>
  //         Sign out
  //       </Button>
  //     )}
  //   </>
  // );

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
