import { useEffect } from "react";
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer";
import "./Voice.scss";
import { Pause, Play } from "lucide-react";
import { formatTimeVoiceMessages } from "@/utils/dateFormatter";
import { ReadedCheckComponent } from "../../ReadedCheckComponent/ReadedCheckComponent";

export default function Voice({ url, isReaded }: { url: string; isReaded: boolean }) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleToggle = () => {
    if (!controls.isAvailableRecordedAudio) return;
    controls.togglePauseResume();
  };

  return (
    <div className="voice__wrapper">
      {!controls.isAvailableRecordedAudio && <div></div>}
      <button className="voice__button" onClick={handleToggle} disabled={!controls.isAvailableRecordedAudio}>
        {controls.isPausedRecordedAudio ? <Play fill="white" size={16} /> : <Pause size={16} fill="white" />}
      </button>
      <VoiceVisualizer
        progressIndicatorTimeClassName={"voice__time"}
        progressIndicatorTimeOnHoverClassName={"voice__hover-time"}
        controls={controls}
        height={60}
        width={200}
        barWidth={4}
        gap={1}
        progressIndicatorOnHoverClassName={"voice__hover-stick"}
        rounded={6}
        canvasContainerClassName={"voice__main"}
        isControlPanelShown={false}
        backgroundColor="#418FFF"
        secondaryBarColor="#00FF7F"
      />
      <div className="voice__duration">
        {formatTimeVoiceMessages(controls.currentAudioTime)} / {formatTimeVoiceMessages(controls.duration)}
      </div>
      <ReadedCheckComponent checked={isReaded} />
    </div>
  );
}
