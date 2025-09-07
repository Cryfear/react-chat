import { createDialogFx } from "../../DialogsLIst/DialogsList.model";
import { messageSentSwitcher, initialiseDialogFx } from "../../Home.model";
import { socket } from "../../../../socket";
import { MessagesApi } from "../../../../api/MessagesApi";
import { createEffect } from "effector";

export const sendMessageFx = createEffect(
  async ({ dialogId, userId, myId, data }: any) => {
    if (dialogId) { // если диалог уже есть с собеседником
      const message = await MessagesApi.create({ dialogId, myId, data }); //data - its a message text

      console.log(message);

      socket.emit("qqq", {
        content: message.data,
        to: message.data.creater === myId ? myId : userId,
      });

      messageSentSwitcher();

      return message.data;
    } else { // если диалог нужно создать
      let dialogIdRes = null;
      console.log(myId, userId)

      if (userId) {
        dialogIdRes = await createDialogFx({ id1: myId, id2: userId })
      }

      console.log(dialogIdRes)

      if (userId) await initialiseDialogFx({ userId, myId, page: 0 });

      const message = await MessagesApi.create({
        dialogId: dialogIdRes.data,
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
  }
);
