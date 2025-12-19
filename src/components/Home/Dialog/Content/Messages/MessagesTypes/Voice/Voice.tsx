import { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import "./Voice.scss";
import { Pause, Play } from "lucide-react";

export default function Voice({ url }: { url: string }) {
  const controls = useVoiceVisualizer({
    shouldHandleBeforeUnload: false,
  });

  useEffect(() => {
    let isMounted = true;

    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        if (!isMounted) return;
        controls.setPreloadedAudioBlob(blob); 
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return (
    <div className="voice__wrapper">
      <button className="voice__button" onClick={controls.togglePauseResume}>
        {controls.isPausedRecordedAudio ? <Play fill="white" size={16} /> : <Pause size={16} fill="white"/>}
      </button>
      <VoiceVisualizer
        progressIndicatorTimeClassName={"voice__time"}
        controls={controls}
        height={60}
        width={260}
        barWidth={4}
        gap={1}
        rounded={6}
        canvasContainerClassName={"voice__main"}
        isControlPanelShown={false}
        backgroundColor="#418FFF"
        secondaryBarColor="#00FF7F"
      />
      <div className="voice__duration">{controls.formattedDuration.replace('s', '')}</div>
    </div>
  );
}
