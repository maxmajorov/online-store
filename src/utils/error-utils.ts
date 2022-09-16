import { Dispatch } from "@reduxjs/toolkit";
import { ResponseType } from "../api/types";
import { setAppErrorAC, setAppStatusAC } from "../store/reducers/app-reducer";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch
) => {
  if (data.error?.errors.length) {
    dispatch(setAppErrorAC({ error: data.error?.errors[0].message }));
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }));
  }
  dispatch(setAppStatusAC({ status: "failed" }));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(
    setAppErrorAC({
      error: error.message ? error.message : "Some error occurred",
    })
  );
  dispatch(setAppStatusAC({ status: "failed" }));
};
