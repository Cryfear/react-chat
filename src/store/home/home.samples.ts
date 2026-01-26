import { $DialogsListStore } from '@stores/DialogsList.model';
import { $HomeStore } from '@stores/home/home.store';
import { sample } from "effector";
import { dialogLoaded, messagesRead, socketMessageReceived } from "./home.events";
import { mapSocketMessageToDialog } from './home.mappers';
import { readDialogFx } from './home.effects';

sample({
  clock: dialogLoaded,
  source: $HomeStore,
  fn: (state) => ({
    ...state,
    currentDialog: {
      ...state.currentDialog,
      page: 1,
    },
  }),
  target: $HomeStore,
});

sample({
  clock: socketMessageReceived,
  source: $HomeStore,
  filter: (state, message) => state.currentDialog.id === message.dialog,
  fn: (state, message) => {
    const mapped = mapSocketMessageToDialog(message);

    if (state.currentDialogMessages.some((m) => m._id === mapped._id)) {
      return state;
    }

    return {
      ...state,
      currentDialogMessages: [mapped, ...state.currentDialogMessages],
    };
  },
  target: $HomeStore,
});

sample({
  clock: readDialogFx.done,
  source: $HomeStore,
  fn: (state) => ({
    ...state,
    currentDialogMessages: state.currentDialogMessages.map((m) =>
      m.creater === state.currentUser.id
        ? { ...m, isReaded: true }
        : m
    ),
  }),
  target: $HomeStore,
});

sample({
  clock: messagesRead,
  source: $HomeStore,
  filter: (state, { dialogId }) => state.currentDialog.id === dialogId,
  fn: (state) => ({
    ...state,
    currentDialogMessages: state.currentDialogMessages.map((m) =>
      m.creater !== state.currentUser.id
        ? { ...m, isReaded: true }
        : m
    ),
  }),
  target: $HomeStore,
});

sample({
  clock: readDialogFx.done,
  source: {
    dialogsState: $DialogsListStore,
    homeState: $HomeStore,
  },
  fn: ({ dialogsState, homeState }) => {
    const currentDialogId = homeState.currentDialog.id;

    return {
      ...dialogsState,
      dialogs: dialogsState.dialogs.map((d) =>
        d._id === currentDialogId
          ? { ...d, unreadCount: 0 }
          : d
      ),
    };
  },
  target: $DialogsListStore,
});