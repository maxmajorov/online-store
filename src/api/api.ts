import axios, { AxiosResponse } from "axios";
import { LoginParamsType } from "./types";

// export const instance = axios.create({
//   baseURL: "https://social-network.samuraijs.com/api/1.1/",
//   headers: { "API-KEY": "196d543e-854d-4840-b68c-b0f81150459a" },
//   withCredentials: true,
// });

// ==== AUTHORIZATION ====

export const authAPI = {
  // authMe() {
  //   return instance.get<
  //     ResponseType<{ id: number; email: string; login: string }>
  //   >("auth/me");
  // },
  // signInWithGoogle(data: LoginParamsType) {
  // },
  // signInWithEmailAndPassword(data: LoginParamsType) {
  //   return instance.post<
  //     LoginParamsType,
  //     AxiosResponse<ResponseType<{ userId?: string }>>
  //   >("auth/login", data);
  // },
  // logout() {
  //   return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
  // },
};
