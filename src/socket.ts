import { createEffect } from "effector";
import { io } from "socket.io-client";
import { messageType } from "./types/Home.types";
import { typingStarted, typingStopped } from "./store/Typing.model";
import { Socket } from "socket.io-client";

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

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io("localhost:8888", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
  return socket;
};

getSocket().on("typing:start", ({ dialogId }: {dialogId: string}) => {
  typingStarted({ dialogId });
});

getSocket().on("typing:stop", ({ dialogId }: {dialogId: string}) => {
  typingStopped({ dialogId });
});
