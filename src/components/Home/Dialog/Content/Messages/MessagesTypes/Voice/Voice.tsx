import { AudioMessage } from "./AudioMessage";

export default function Voice(source: {blob?: Blob, url?: string}) {
  return (
    <div>
      {source && (
        // <div style={{ marginTop: 20 }}>
        //   <audio controls src={audioURL.audioURL}></audio>
        // </div>
        <AudioMessage source={source} />
      )}
    </div>
  );
}
