import axios, { AxiosResponse } from "axios";
import { SendOrderInfoType, TelegramResponseType } from "./types";

export const instance = axios.create({
  baseURL: `https://api.telegram.org/bot${process.env.REACT_APP_BOT_TOKEN}/`,
});

// ==== SEND MESSAGES TO TELEGRAM BOT ====

export const telegramAPI = {
  sendOrderInfo(orderMessage: string) {
    const data: SendOrderInfoType = {
      chat_id: process.env.REACT_APP_CHAT_ID || "",
      parse_mode: "html",
      text: orderMessage,
    };

    return instance.post<any, AxiosResponse<TelegramResponseType>>(
      "sendMessage",
      data
    );
  },
};
