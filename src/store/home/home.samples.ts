import { $HomeStore } from '@stores/home/home.store';
import { sample } from "effector";
import { dialogLoaded, socketMessageReceived } from "./home.events";
import { mapSocketMessageToDialog } from './home.mappers';

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
  filter: (state, message) => state.currentDialog.id === message.dialogId,
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