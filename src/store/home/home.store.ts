import { HomeStoreTypes } from "@/types/Home.types";
import { createStore } from "effector";

export const $HomeStore = createStore<HomeStoreTypes>({
  loadedDialog: false, // отвечает за инициализацию выбранного диалога, то есть первоначальная загрузка
  isDialogFullLoaded: false, // долистали ли мы до конца сообщений, чтобы не отправлять лишние запросы
  currentUser: {
    name: null,
    id: null,
    avatar: null,
    isOnline: false,
  }, // это собеседник
  currentDialog: {
    // текущий диалог
    id: "", // dialogId
    page: 0, // страница сообщений
    unreadedPage: 0, // непрочитанные сообщения если есть больше десятка
    isTyping: false
  },
  currentDialogMessages: [],
  messageSent: false, // флаг для отправки сообщения, чтобы проскролить вниз когда станет true
});

export const $currentDialogMessages = $HomeStore.map(
  (s) => s.currentDialogMessages
);

export const $currentUser = $HomeStore.map((s) => s.currentUser);
export const $currentDialog = $HomeStore.map((s) => s.currentDialog);