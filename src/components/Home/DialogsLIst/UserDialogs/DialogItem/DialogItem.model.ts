import {createEffect, createStore} from "effector";

interface DialogItemStoreTypes {
  lastMessage: string,
  unreadCount: number;
}


// export const setLastMessage = createEffect(async (id: string) => {
//   const res = await MessagesApi.getLastDialogMessage(id);
//   console.log(res.data);
//   return res.data;
// })

export const DialogItemStore = createStore<DialogItemStoreTypes>({
  lastMessage: '',
  unreadCount: 0
})
//   .on(setDialogState.doneData, (state, newState) => {
//   return {
//     ...state,
//     ...newState,
//     isInitilized: true
//   }
// })