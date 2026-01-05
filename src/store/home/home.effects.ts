import { DialogsApi } from "@/api/DialogsApi";
import { UsersApi } from "@/api/UsersApi";
import { initDialogTypes, onScrollLoaderMessagesTypes, usersType } from "@/types/Home.types";
import { createEffect } from "effector";
import { clearMessages, dialogLoaded } from "./home.events";
import { MessagesApi } from "@/api/MessagesApi";

export const readyToCreateDialogFx = createEffect(async ({ user, myId }: { user: usersType; myId: string | undefined }) => {
  if (!myId || !user) return;
  try {
    const dialog = await DialogsApi.find({ id_1: myId, id_2: user.id });

    if (dialog.data) {
      await initialiseDialogFx({
        userId: user.id,
        myId: myId,
        page: 0,
      });
      return { status: "success", user };
    } else {
      clearMessages();
      return { status: "potencial", user };
    }
  } catch (error) {
    clearMessages();
    return { status: "error", user };
  }
});

export const loadDialogFx = createEffect(async (id: string): Promise<void> => {
  try {
    const user = await UsersApi.findUser(id);
    await readyToCreateDialogFx({ myId: sessionStorage["id"], user: user.data });
    dialogLoaded();
  } catch (error) {
    console.error("Error loading dialog:", error);
  }
}); 

// нужен, когда мы находимся уже на урле диалога, чтобы зафиксировать и отреагировать на загрузку этого диалога

export const initialiseDialogFx = createEffect(async ({ userId, myId, page }: initDialogTypes) => {
  if (!myId || !userId) return;

  const dialog = await DialogsApi.find({
    id_1: userId,
    id_2: myId,
  });
  const user = await UsersApi.findUser(userId);
  const messages = await MessagesApi.getDialogMessages({
    dialogId: dialog.data._id,
    page: 0,
    myId,
  });

  return {
    fullName: user.data.fullName,
    userId: user.data.id,
    avatar: user.data.avatar,
    isOnline: user.data.isOnline,

    currentDialogID: dialog.data._id,
    currentDialogTyping: dialog.data.isTyping,
    currentDialogMessages: messages.data,
    currentDialogPage: page,
    currentDialogOpponentId: dialog.data.users[0] === myId ? dialog.data.users[1] : dialog.data.users[0],
  };
});

export const onScrollLoaderMessages = createEffect(async ({ page, dialogId, myId }: onScrollLoaderMessagesTypes) => {
  try {
    const mes = await MessagesApi.getDialogMessages({
      dialogId,
      page,
      myId,
    });

    if (mes.data.length === 0) {
      return { responseCode: "dialog end" };
    }

    return {
      messages: mes.data,
      page: page,
    };
  } catch (error) {
    console.error("Error loading messages:", error);
    return null;
  }
});