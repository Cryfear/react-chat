import { $HomeStore } from '@/store/home';
import { createStore, sample } from 'effector';

import { createEvent } from "effector";

export const typingStarted = createEvent<{ dialogId: string }>();
export const typingStopped = createEvent<{ dialogId: string }>();

export const $typingDialogId = createStore<string | null>(null);

sample({
  clock: typingStarted  ,
  source: $HomeStore,
  filter: (home, { dialogId }) => home.currentDialog.id === dialogId,
  fn: (_, { dialogId }) => dialogId,
  target: $typingDialogId,
});

sample({
  clock: typingStopped,
  source: $HomeStore,
  filter: (home, { dialogId }) => home.currentDialog.id === dialogId,
  fn: () => null,
  target: $typingDialogId,
});

export const setIsTyping = createEvent<{ from: boolean | null }>();

$HomeStore.on(setIsTyping, (state, payload) => ({
  ...state,
  currentDialog: {
    ...state.currentDialog,
    isTyping: Boolean(payload.from)
  }
}));