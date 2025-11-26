import { createDialogFx } from "../../DialogsLIst/DialogsList.model";
import { messageSentSwitcher, initialiseDialogFx } from "../../Home.model";
import { socket } from "../../../../socket";
import { MessagesApi } from "../../../../api/MessagesApi";
import { createEffect } from "effector";

export const sendMessageFx = createEffect(
  async ({
    userId,
    myId,
    data,
  }: {
    userId?: string;
    myId: string;
    data: string;
  }) => {
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

    messageSentSwitcher(); // скролит к концу при отправке сообщения

    return message.data;
  }
);
