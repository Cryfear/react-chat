import { io } from "socket.io-client";
import { socketGetMessage } from "./components/Home/Home.model";

export const socket = io("localhost:8888", {
  withCredentials: true,
});

socket.on("private", function (msg) {
  socketGetMessage(msg);
});
