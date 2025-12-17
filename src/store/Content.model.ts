import { MessagesApi } from "@api/MessagesApi";
import { createEffect } from "effector";
import { createDialogFx } from "./DialogsList.model";
import { socket } from "@/socket";
import { initialiseDialogFx } from "./Home.model";

export const sendMessageFx = createEffect(async ({ userId, myId, data }: { userId: string; myId: string; data: string }) => {
  try {
    if (!userId || !myId || !data) {
      return console.error("Missing fields");
    }

    const dialogIdRes = await createDialogFx({ id1: myId, id2: userId });

    if (!dialogIdRes?.data) {
      return console.error("Failed to create dialog");
    }

    console.log(dialogIdRes)

    const message = await MessagesApi.create({
      dialogId: dialogIdRes.data,
      myId,
      data,
    });

    if (!message?.data) {
      return console.error("Failed to create message");
    }

    try {
      socket.emit("socketMessage", {
        content: message.data,
        to: message.data.creater === userId ? myId : userId,
      });
    } catch (socketError) {
      return console.error("Socket emit failed:", socketError);
    }

    return message.data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
});

export const sendVoiceFx = createEffect(async ({ userId, myId, data }: { userId: string; myId: string; data: Blob }) => {
  if (!userId || !myId || !data) return;

  const dialogIdRes = await createDialogFx({ id1: myId, id2: userId });

  await initialiseDialogFx({ userId, myId, page: 0 });

  const formData = new FormData();
  formData.append("audio", data);
  formData.append("dialogId", dialogIdRes.data);
  formData.append("myId", myId);
  formData.append("userId", userId);

  const message = await MessagesApi.createAudio(formData);

  socket.emit("socketMessage", {
    content: message.data,
    to: message.data.creater === userId ? userId : myId,
  });

  return message.data;
});
