import { useRef, useCallback } from "react";
import { useUnit } from "effector-react";
import {
  $HomeStore,
  onScrollLoaderMessages,
} from "../components/Home/Home.model";
import {
  $DialogsListStore,
  onScrollDialogsLoaderFx,
} from "../components/Home/DialogsLIst/DialogsList.model";
import { $UsersListStore, onScrollUsersLoaderFx } from "../components/Home/DialogsLIst/UserDialogs/UsersList.model";
import { $isUserSearch } from "../components/Home/DialogsLIst/UserDialogs/UserDialogsContainer";

export const useDebounceScroll = () => {
  const { currentDialog, isDialogFullLoaded } = useUnit($HomeStore);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const debouncedScroll = useCallback(
    (ref: React.RefObject<HTMLDivElement>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (!ref.current || isDialogFullLoaded) return;

        const scrollTop = ref.current.scrollTop;

        if (scrollTop < 100) {
          onScrollLoaderMessages({
            ref,
            page: currentDialog.page,
            dialogId: currentDialog.id,
            myId: sessionStorage["id"],
            isDialogFullLoaded,
          });
        }
      }, 100);
    },
    [currentDialog.page, currentDialog.id, isDialogFullLoaded]
  );

  return debouncedScroll;
};

export const useDebounceDialogsScroll = () => {
  const dialogsStore = useUnit($DialogsListStore);
  const usersStore = useUnit($UsersListStore);
  const isUserSearch = useUnit($isUserSearch);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const target = e.currentTarget;

      timeoutRef.current = setTimeout(() => {

        if (!target) return;

        const { scrollTop, scrollHeight, clientHeight } = target;

        if (scrollHeight - scrollTop - clientHeight < 100) {
          if (isUserSearch) {
            onScrollUsersLoaderFx({ e, page: usersStore.usersSearchPage });
          } else {
            onScrollDialogsLoaderFx({
              e,
              id: sessionStorage["id"],
              page: dialogsStore.dialogsSearchPage,
            });
          }
        }
      }, 150);
    },
    [isUserSearch, usersStore.usersSearchPage, dialogsStore.dialogsSearchPage]
  );

  const clearDebounce = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null; // важно обнулять ссылку
    }
  }, []);

  return { debouncedScroll, clearDebounce };
};
