import { useRef, useCallback } from 'react';
import { useUnit } from 'effector-react';
import { $HomeStore, onScrollLoaderMessages } from '../components/Home/Home.model';

export const useDebounceScroll = () => {
  const { currentDialog, isDialogFullLoaded } = useUnit($HomeStore);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const debouncedScroll = useCallback((ref: React.RefObject<HTMLDivElement>) => {
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
          myId: sessionStorage['id'],
          isDialogFullLoaded,
        });
      }
    }, 100); // Задержка 150ms
  }, [currentDialog.page, currentDialog.id, isDialogFullLoaded]);

  return debouncedScroll;
};