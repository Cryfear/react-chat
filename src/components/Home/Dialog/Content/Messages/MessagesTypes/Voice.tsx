export default function Voice(audioURL: any) {
  return (
    <div>
      {audioURL && (
        <div style={{ marginTop: 20 }}>
          <audio controls src={audioURL.audioURL}></audio>
        </div>
      )}
    </div>
  );
}
