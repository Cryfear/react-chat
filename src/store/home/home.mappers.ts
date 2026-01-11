import { dialogServerType, ISocketMessage } from "@/types/Home.types";

export const mapSocketMessageToDialog = (msg: ISocketMessage): dialogServerType => ({
  _id: msg._id,
  createdAt: msg.createdAt,
  updatedAt: msg.createdAt,
  creater: msg.creater,
  data: msg.data,
  dialog: msg.dialog,
  enum: "text",
  isReaded: false,
  __v: 0,
  date: new Date(msg.createdAt).toString(),
});