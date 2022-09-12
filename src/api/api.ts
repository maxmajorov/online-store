import axios, { AxiosResponse } from "axios";
import {
  GetTasksResponse,
  LoginParamsType,
  ResponseType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
} from "./types";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: { "API-KEY": "196d543e-854d-4840-b68c-b0f81150459a" },
  withCredentials: true,
});

// ==== AUTHORIZATION ====

export const authAPI = {
  authMe() {
    return instance.get<
      ResponseType<{ id: number; email: string; login: string }>
    >("auth/me");
  },

  login(data: LoginParamsType) {
    return instance.post<
      LoginParamsType,
      AxiosResponse<ResponseType<{ userId?: string }>>
    >("auth/login", data);
  },

  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>("auth/login");
  },
};

// ==== TODO ====

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },

  createTodolist(title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TodolistType }>>
    >("todo-lists", { title });
  },

  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`);
  },

  updateTodolist(id: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${id}`,
      { title }
    );
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },

  createTask(todolistId: string, title: string) {
    return instance.post<
      { title: string },
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks`, { title });
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<
      UpdateTaskModelType,
      AxiosResponse<ResponseType<{ item: TaskType }>>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};
