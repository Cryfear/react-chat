import { MessagesApi } from "@api/MessagesApi";
import { createEffect } from "effector";
import { createDialogFx } from "./DialogsList.model";
import { initialiseDialogFx } from "./home";

export const sendMessageFx = createEffect(async ({ userId, myId, data }: { userId: string | null; myId: string; data: string }) => {
  try {
    if (!userId || !myId || !data) {
      return console.error("Missing fields");
    }

    const dialogIdRes = await createDialogFx({ id1: myId, id2: userId });

    if (!dialogIdRes?.data) {
      return console.error("Failed to create dialog");
    }

    const message = await MessagesApi.create({
      dialogId: dialogIdRes.data.id,
      myId,
      data,
    });

    if (!message?.data) {
      return console.error("Failed to create message");
    }

    return message.data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
});

export const sendVoiceFx = createEffect(async ({ userId, myId, data }: { userId: string | null; myId: string | null; data: Blob }) => {
  if (!userId || !myId || !data) return;

  const dialogIdRes = await createDialogFx({ id1: myId, id2: userId });

  await initialiseDialogFx({ userId, myId, page: 0 });

  const formData = new FormData();
  formData.append("audio", data);
  formData.append("dialogId", dialogIdRes.data);
  formData.append("myId", myId);
  formData.append("userId", userId);

  const message = await MessagesApi.createAudio(formData);

  return message.data;
});
