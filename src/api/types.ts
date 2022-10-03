// ==== TYPES ====

export type SendOrderInfoType = {
  chat_id: string;
  parse_mode: string;
  text: string;
};

export type TelegramResponseType = {
  ok: boolean;
  result: any;
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
