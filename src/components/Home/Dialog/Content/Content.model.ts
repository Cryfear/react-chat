import { createDialogFx } from "../../DialogsLIst/DialogsList.model";
import { initialiseDialogFx } from "../../Home.model";
import { socket } from "../../../../socket";
import { MessagesApi } from "../../../../api/MessagesApi";
import { createEffect } from "effector";

export const sendMessageFx = createEffect(async ({ userId, myId, data }: { userId: string; myId: string; data: string }) => {
  if (!userId || !myId || !data) {
    return;
  }

  const dialogIdRes = await createDialogFx({ id1: myId, id2: userId });
  await initialiseDialogFx({ userId, myId, page: 0 });

  const message = await MessagesApi.create({
    dialogId: dialogIdRes.data.dialogId,
    myId,
    data,
  });

  socket.emit("qqq", {
    content: message.data,
    to: message.data.creater === userId ? myId : userId,
  });

  return message.data;
});

export const sendVoiceFx = createEffect(async ({ userId, myId, data }: { userId: string; myId: string; data: any }) => {
  if (!userId || !myId || !data) return;
  
  const dialogIdRes = await createDialogFx({ id1: myId, id2: userId });

  await initialiseDialogFx({ userId, myId, page: 0 });

  const formData = new FormData();
  formData.append("audio", data);
  formData.append("dialogId", dialogIdRes.data.dialogId);
  formData.append("myId", myId);
  formData.append("userId", userId);

  const message = await MessagesApi.createAudio(formData);

  socket.emit("qqq", {
    content: message.data,
    to: message.data.creater === userId ? myId : userId,
  });

  return message.data;
});
