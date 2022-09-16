import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { RootStateType } from "../store";
import { setAppStatusAC } from "./app-reducer";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Типизация state в toolkit Не нужна

// ==== THUNKS ====

interface ValidationErrors {
  errors: string;
}

export const signInWithEmailAndPasswordTC = createAsyncThunk(
  "",
  async (data: { email: string; password: string }, thunkAPI) => {
    const { email, password } = data;

    try {
      thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response.user.uid) {
        thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
        return;
      } else {
        return thunkAPI.rejectWithValue({
          errors: "Invalid email or password",
        });
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>;
      handleServerNetworkError(err, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: "Invalid email or password",
      });
    }
  }
);

// export const signInWithGoogleTC = createAsyncThunk<
//   undefined,
//   undefined,
//   {
//     rejectValue: ValidationErrors;
//   }
// >("", async (data, thunkAPI) => {
// const auth = getAuth();
// const response = await signInWithPopup(auth, new GoogleAuthProvider());
// try {
//   const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
//   console.log(user.uid);
//   setIsAuth(!isAuth);
//   setOpen(!open);
// } catch (error: any) {
//   console.log(error.message);
//   // throw error;
// } finally {
//   setAuthing(false);
// }
// try {
//   thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
//   if (response.user) {
//     thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
//     return;
//   } else {
//     handleServerAppError(response.user, thunkAPI.dispatch);
//     return thunkAPI.rejectWithValue({
//       errors: response.user,
//       fieldsErrors: [""],
//     });
//   }
// } catch (e) {
//   const err = e as Error | AxiosError<{ error: string }>;
//   handleServerNetworkError(err, thunkAPI.dispatch);
//   return thunkAPI.rejectWithValue({
//     errors: ["response.user"],
//     fieldsErrors: [""],
//   });
// }
// });

// export const logoutTC = createAsyncThunk(
//   "authorization/logout",
//   async (param, thunkAPI) => {
//     const response = await authAPI.logout();

//     try {
//       thunkAPI.dispatch(setAppStatusAC({ status: "loading" }));
//       if (response.data.resultCode === 0) {
//         thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }));
//         return;
//       } else {
//         handleServerAppError(response.data, thunkAPI.dispatch);
//         return thunkAPI.rejectWithValue({
//           errors: response.data.messages,
//         });
//       }
//     } catch (e) {
//       const err = e as Error | AxiosError<{ error: string }>;
//       handleServerNetworkError(err, thunkAPI.dispatch);
//       return thunkAPI.rejectWithValue({
//         errors: response.data.messages,
//       });
//     }
//   }
// );

const slice = createSlice({
  name: "auth",
  initialState: {
    isSignInWithGoogle: false,
    isSignInWithEmailAndPassword: false,
  },
  reducers: {
    setIsSignInWithGoogleAC(state) {
      state.isSignInWithGoogle = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(signInWithEmailAndPasswordTC.fulfilled, (state) => {
      state.isSignInWithEmailAndPassword = true;
    });
  },

  //   builder.addCase(logoutTC.fulfilled, (state) => {
  //     state.isLoggedIn = false;
  //   });
  // },
});

export const authReducer = slice.reducer;

export const { setIsSignInWithGoogleAC } = slice.actions;

// ==== SELECTORS ====

export const isSignInWithGoogleSelector = (state: RootStateType) =>
  state.auth.isSignInWithGoogle;

export const isSignInWithEmailAndPasswordSelector = (state: RootStateType) =>
  state.auth.isSignInWithEmailAndPassword;

// ==== TYPES ====
