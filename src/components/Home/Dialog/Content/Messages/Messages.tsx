import React, { useCallback, useRef } from "react";
import { useDebounceScroll } from "@hooks/useDebounceScroll";

interface MessagesProps {
  messages: React.ReactNode;
  setShowEmojiPicker: (value: boolean) => void;
}

export const Messages: React.FC<MessagesProps> = ({ messages, setShowEmojiPicker}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const debouncedScroll = useDebounceScroll();

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      debouncedScroll(scrollRef);
    }
  }, [debouncedScroll]);

  return (
    <div className="content__messages" ref={scrollRef} onScroll={handleScroll} onClick={() => setShowEmojiPicker(false)}>
      {messages}
    </div>
  );
};
