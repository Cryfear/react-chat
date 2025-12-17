import { getAudioPeaks } from "@/utils/audioPeaks";
import React, { useEffect, useRef, useState } from "react";

interface AudioMessageProps {
  source: {
    blob?: Blob;
    url?: string;
  };
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ source }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [peaks, setPeaks] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    getAudioPeaks(source).then(setPeaks);
  }, [source]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setProgress(audio.currentTime / audio.duration || 0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => audio.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

   const audioSrc = source.url ?? URL.createObjectURL(source.blob!);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const drawWaveform = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bars = 30;
    const barWidth = canvas.width / bars;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bars; i++) {
      const height = Math.random() * canvas.height;

      ctx.fillStyle = i / bars < progress ? "#4ade80" : "#e5e7eb";

      ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
    }
  };

  return (
    <div className="audio-message">
      <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>

      <canvas ref={canvasRef} width={180} height={40} ></canvas>

      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};
