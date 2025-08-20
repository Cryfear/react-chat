import { createDialogFx } from "../../DialogsLIst/DialogsList.model";
import { messageSentSwitcher, initialiseDialogFx } from "../../Home.model";
import { socket } from "../../../../socket";
import { MessagesApi } from "../../../../api/MessagesApi";
import { createEffect } from "effector";

export const sendMessageFx = createEffect(
  async ({ dialogId, userId, myId, data }) => {
    console.log(data, dialogId, userId, myId);
    if (dialogId) {
      const message = await MessagesApi.create({ dialogId, myId, data });

      socket.emit("qqq", {
        content: message.data,
        to:
          message.data.creater === message.data.dialog.users[0]
            ? message.data.dialog.users[1]
            : message.data.dialog.users[0],
      });

      messageSentSwitcher();
      return message.data;
    } else {
      const dialogIdRes = await createDialogFx({
        id1: sessionStorage["id"],
        id2: userId,
      });
      await initialiseDialogFx({ userId, myId, page: 0 });

      const message = await MessagesApi.create({
        dialogId: dialogIdRes.data.dialogId,
        myId,
        data,
      });

      console.log(message);

      socket.emit("qqq", {
        content: message.data,
        to:
          message.data.creater === message.data.dialog.users[0]
            ? message.data.dialog.users[1]
            : message.data.dialog.users[0],
      });

      messageSentSwitcher();
      return message.data;
    }
  }
);
