import { MessagesApi } from './../../../../../api/MessagesApi';
import { createEffect } from 'effector';

export const getLastDialogMessage = createEffect(async (dialogId: string) => {
  try {
    const lastMessage = await MessagesApi.getLastDialogMessage(dialogId);
    return {
      text: lastMessage.data.text,
      date: lastMessage.data.date,
    };
  } catch (err) {}
});

export const getUnreadedMessagesCount = createEffect(
  async ({ dialogId, userId }: {dialogId: string, userId: string}) => {
    try {
      const unreadedCount = await MessagesApi.getUnreadedMessagesCount({
        dialogId,
        userId,
      });

      return unreadedCount.data.length;
    } catch (err) {}
  }
);