import { useRef, useCallback } from "react";
import { useUnit } from "effector-react";
import {
  $HomeStore,
  onScrollLoaderMessages,
} from "../components/Home/Home.model";
import {
  $DialogsListStore,
  onScrollDialogsLoaderFx,
  onScrollUsersLoaderFx,
} from "../components/Home/DialogsLIst/DialogsList.model";

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
  const store = useUnit($DialogsListStore);
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
          if (store.isUserSearch) {
            onScrollUsersLoaderFx({ e, page: store.usersSearchPage });
          } else {
            onScrollDialogsLoaderFx({
              e,
              id: sessionStorage["id"],
              page: store.dialogsSearchPage,
            });
          }
        }
      }, 150); // Задержка 150ms
    },
    [store.isUserSearch, store.usersSearchPage, store.dialogsSearchPage]
  );

  const clearDebounce = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null; // важно обнулять ссылку
    }
  }, []);

  return { debouncedScroll, clearDebounce };
};
