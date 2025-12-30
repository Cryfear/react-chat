import React, { useEffect, useRef, useState } from "react";
import voice from "@assets/mic.png";
import { useUnit } from "effector-react";
import { $LoginStore } from "@stores/Login.model";
import { sendVoiceFx } from "@stores/Content.model";

interface SendVoiceParams {
  myId: string | null;
  data: Blob;
  userId: string | null;
}

export const VoiceMessage: React.FC = () => {
  const { myUserData, currentUser } = useUnit({
    myUserData: $LoginStore.map((s) => s.myUserData),
    currentUser: $LoginStore.map((s) => s.myUserData),
  });

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    return () => {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
      stopMediaStream();
    };
  }, [audioURL]);

  const stopMediaStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      navigator.vibrate?.(30);

      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e: BlobEvent) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mediaRecorder.mimeType || "audio/webm",
        });

        setAudioBlob(blob);

        const url = URL.createObjectURL(blob);
        setAudioURL(url);

        const params: SendVoiceParams = {
          myId: myUserData.id,
          data: blob,
          userId: currentUser.id,
        };

        sendVoiceFx(params);

        setAudioBlob(null);
        setAudioURL(null);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone error", err);
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleVoiceClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <span className={`send-form__voice ${isRecording ? "recording" : ""}`} onClick={handleVoiceClick}>
      <img src={voice} alt="voice icon" />
    </span>
  );
};
