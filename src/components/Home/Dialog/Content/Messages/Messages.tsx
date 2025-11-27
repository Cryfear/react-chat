import React, { useCallback, useRef } from "react";
import { useDebounceScroll } from "../../../../../hooks/useDebounceScroll";

export const Messages = ({ messages, setShowEmojiPicker }: { messages: any, setShowEmojiPicker:any }) => {
  const scrollRef: any = useRef(null);
  const debouncedScroll = useDebounceScroll();
  
  const handleScroll = useCallback(() => {
    debouncedScroll(scrollRef);
  }, [debouncedScroll]);

  return (
    <div onClick={() => setShowEmojiPicker(false)} className="content__messages" ref={scrollRef} onScroll={handleScroll}>
      {messages}
    </div>
  );
};
