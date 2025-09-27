import { createEffect } from "effector";
import { io } from "socket.io-client";
import { messageType } from "./components/Home/Home.types";

export const socketGetMessage = createEffect((msg: messageType) => {
  if (msg) {
    return {
      dialogId: msg.content.dialog._id,
      messageCreater: msg,
      messageOpponent: msg.to,
      messageDate: msg.content.date,
      message: msg.content,
      isReaded: msg.content.isReaded,
      messageId: msg.content._id,
    };
  }
});

export const socket = io("localhost:8888", {
  withCredentials: true,
  transports: ["websocket", "polling"]
});

socket.on("private", function (msg) {
  socketGetMessage(msg);
});
