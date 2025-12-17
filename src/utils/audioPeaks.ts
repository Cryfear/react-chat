interface AudioSource {
  blob?: Blob;
  url?: string;
}

export async function getAudioPeaks(
  source: AudioSource,
  barsCount = 40
): Promise<number[]> {
  const audioContext = new AudioContext();
  let arrayBuffer: ArrayBuffer;

  if (source.blob) {
    arrayBuffer = await source.blob.arrayBuffer();
  } else if (source.url) {
    console.log(source)
    const response = await fetch(source.url);
    arrayBuffer = await response.arrayBuffer();
  } else {
    throw new Error("No audio source");
  }

  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const channelData = audioBuffer.getChannelData(0);

  const blockSize = Math.floor(channelData.length / barsCount);
  const peaks: number[] = [];

  for (let i = 0; i < barsCount; i++) {
    let sum = 0;
    const start = i * blockSize;

    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(channelData[start + j]);
    }

    peaks.push(sum / blockSize);
  }

  return peaks;
}
