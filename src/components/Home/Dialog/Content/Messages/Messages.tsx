import React, { useCallback, useRef } from "react";
import { useDebounceScroll } from "../../../../../hooks/useDebounceScroll";

export const Messages = ({ messages }: { messages: any }) => {
  const scrollRef: any = useRef(null);
  const debouncedScroll = useDebounceScroll();
  
  const handleScroll = useCallback(() => {
    debouncedScroll(scrollRef);
  }, [debouncedScroll]);

  return (
    <div className="content__messages" ref={scrollRef} onScroll={handleScroll}>
      {messages}
    </div>
  );
};
