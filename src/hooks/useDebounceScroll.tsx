import { useRef, useCallback } from "react";
import { useUnit } from "effector-react";
import { $isUserSearch, $UsersListStore, onScrollUsersLoaderFx } from "@stores/UsersList.model";
import { $DialogsListStore, loadMoreDialogsFx } from "@stores/DialogsList.model";
import { $HomeStore, onScrollLoaderMessages } from "@/store/home";

export const useDebounceScroll = () => {
  const { currentDialog, isDialogFullLoaded } = useUnit($HomeStore);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const debouncedScroll = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>) => {
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
  const { dialogsSearchPage, usersSearchPage, isUserSearch } = useUnit({
    dialogsSearchPage: $DialogsListStore.map((s) => s.dialogsSearchPage),
    usersSearchPage: $UsersListStore.map((s) => s.usersSearchPage),
    isUserSearch: $isUserSearch,
  });

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
            onScrollUsersLoaderFx({ page: usersSearchPage });
          } else {
            loadMoreDialogsFx({
              id: sessionStorage["id"],
              page: dialogsSearchPage,
            });
          }
        }
      }, 150);
    },
    [isUserSearch, usersSearchPage, dialogsSearchPage]
  );

  const clearDebounce = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { debouncedScroll, clearDebounce };
};
