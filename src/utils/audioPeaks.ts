export async function getAudioPeaksFromElement(
  audio: HTMLAudioElement,
  samples = 60
): Promise<number[]> {
  const audioContext = new AudioContext();

  await audioContext.resume();

  const source = audioContext.createMediaElementSource(audio);
  const analyser = audioContext.createAnalyser();

  analyser.fftSize = 2048;
  source.connect(analyser);
  analyser.connect(audioContext.destination);

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const peaks: number[] = [];

  audio.currentTime = 0;
  await audio.play();

  for (let i = 0; i < samples; i++) {
    analyser.getByteTimeDomainData(dataArray);

    let max = 0;
    for (let j = 0; j < bufferLength; j++) {
      const v = Math.abs(dataArray[j] - 128);
      if (v > max) max = v;
    }

    peaks.push(max / 128);
    await new Promise((r) => setTimeout(r, 20));
  }

  audio.pause();
  audio.currentTime = 0;

  audioContext.close();
  return peaks;
}