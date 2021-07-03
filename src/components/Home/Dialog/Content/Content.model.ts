import { createEffect, createStore } from "effector";
import { MessagesApi } from "../../../../api/MessagesApi";
import { UsersApi } from "../../../../api/UsersApi";

interface ContentStoreTypes {
  currentUser: {
    name: string;
    id: string;
    avatar: string;
    isOnline: boolean;
  } | null;
  currentDialogMessages: any[];
}

export const messagesLoaderFx = createEffect(
  async ({ dialogId, page }: any) => {
    return await MessagesApi.getDialogMessages({ dialogId, page });
  }
);

export const ContentStore = createStore<ContentStoreTypes>({
  currentUser: null,
  currentDialogMessages: [],
});
