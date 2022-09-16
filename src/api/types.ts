// ==== TYPES ====

export type LoginParamsType = {
  email: string;
  password: string;
};

type ErrorType = {
  domain: string;
  message: string;
  reason: string;
};

export type ResponseType<D = {}> = {
  error?: {
    code: number;
    errors: Array<ErrorType>;
  };
  data: D;
};
