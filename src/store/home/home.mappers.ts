import { dialogServerType, ISocketMessage } from "@/types/Home.types";

export const mapSocketMessageToDialog = (msg: ISocketMessage): dialogServerType => ({
  _id: msg._id,
  createdAt: msg.createdAt,
  updatedAt: msg.createdAt,
  creater: msg.from,
  data: msg.text,
  dialog: msg.dialogId,
  enum: "text",
  isReaded: false,
  __v: 0,
  date: new Date(msg.createdAt).toString(),
});