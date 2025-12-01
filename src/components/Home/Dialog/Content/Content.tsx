import React, { useRef, useState } from "react";
import { MessagesContainer } from "./Messages/MessagesContainer";
import { SendMessage } from "./SendMessage/SendMessage";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import "./Content.scss";

export const Content = () => {
  // stickers funcs
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  // audio funcs
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef: any = useRef(null);
  const chunksRef: any = useRef([]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder: any = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e: any) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url: any = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone error", err);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="content">
      <MessagesContainer isRecording={isRecording} setShowEmojiPicker={setShowEmojiPicker}/>
      
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} className="emoji-picker" />
        </div>
      )}
      
      <SendMessage
        inputValue={inputValue}
        setInputValue={setInputValue}
        onToggleEmojiPicker={toggleEmojiPicker}
        showEmojiPicker={showEmojiPicker}
        startRecording={startRecording}
        stopRecording={stopRecording}
        audioURL={audioURL}
        isRecording={isRecording}
      />
    </div>
  );
};
