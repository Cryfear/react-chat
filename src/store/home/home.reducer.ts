import { $HomeStore } from '@stores/home/home.store';
import { clearMessages, messageSentSwitcher } from './home.events';
import { initialiseDialogFx, onScrollLoaderMessages, readyToCreateDialogFx } from './home.effects';
import { sendMessageFx } from '../Content.model';
import { dialogServerType, MessageType } from '@/types/Home.types';
import { getUsersBySearch } from '../UsersList.model';

$HomeStore
  .on(clearMessages, (state) => {
    return {
      ...state,
      currentDialogMessages: [],
    };
  })
  .on(readyToCreateDialogFx.doneData, (state, data) => {
    if (!data) return state;
    return {
      ...state,
      currentUser: {
        ...data.user,
        name: data.user.fullName,
      },
    };
  })
  .on(initialiseDialogFx.doneData, (state, data) => {
    if (!data) return state;

    return {
      ...state,
      loadedDialog: true,
      messageSent: false,
      currentUser: {
        name: data.fullName,
        id: data.userId,
        avatar: data.avatar,
        isOnline: data.isOnline,
      },
      currentDialog: {
        id: data.currentDialogID,
        isTyping: data.currentDialogTyping,
        page: 1, // Начинаем с page 1
        unreadedPage: 0,
        opponentId: data.currentDialogOpponentId,
      },
      currentDialogMessages: data.currentDialogMessages,
      isDialogFullLoaded: false, // Сбрасываем при инициализации нового диалога
    };
  })
  .on(sendMessageFx.doneData, (state, data) => {
    return {
      ...state,
      currentDialogMessages: [data, ...state.currentDialogMessages],
    };
  })
  .on(onScrollLoaderMessages.doneData, (state, data) => {
    if (!data) return state;

    if (data.responseCode === "dialog end") {
      return { ...state, isDialogFullLoaded: true };
    }

    if (data.messages && data.messages.length > 0) {
      const existingIds = new Set(state.currentDialogMessages.map((msg: dialogServerType) => msg._id));
      const newMessages = data.messages.filter((msg: MessageType) => !existingIds.has(msg._id));

      if (newMessages.length === 0) {
        return state;
      }

      return {
        ...state,
        currentDialogMessages: [...state.currentDialogMessages, ...newMessages],
        currentDialog: {
          ...state.currentDialog,
          page: state.currentDialog.page + 1,
        },
        loadedDialog: true,
      };
    }

    return state;
  })
  .on(getUsersBySearch.doneData, (state, data) => {
    if (data === "close")
      return {
        ...state,
        currentDialog: {
          ...state.currentDialog,
          page: 0,
        },
        loadedDialog: false,
      };
    return {
      ...state,
      currentDialog: {
        ...state.currentDialog,
        page: 0,
      },
      loadedDialog: false,
    };
  })
  .on(messageSentSwitcher, (state, _) => {
    return {
      ...state,
      messageSent: !state.messageSent,
    };
  });
