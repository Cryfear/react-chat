import React, { useState, useRef, useEffect } from "react";
import "./AudioMessage.scss";

const AudioMessage = props => {
  const [isPlay, setPlay] = useState(false);
  const [isStop, setStop] = useState(true);
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState("00:00");
  const audioEl = useRef(null);

  useEffect(() => {
    audioEl.current.volume = "0.01";

    audioEl.current.addEventListener("timeupdate", () => {
      setProgress((audioEl.current.currentTime / audioEl.current.duration) * 111);
      const mins = Math.floor(audioEl.current.currentTime / 60);
      const secs = (audioEl.current.currentTime % 60).toFixed();
      setTime(`${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`);
    });

    audioEl.current.addEventListener(
      "ended",
      () => {
        setTime("00:00");
        setProgress(0);
        setStop(true);
        setPlay(false);
      },
      false
    );
  }, []);

  const music = bool => {
    isStop ? audioEl.current.play() : audioEl.current.pause();
  };

  const play = () => {
    isPlay
      ? setPlay(false)
      : (() => {
          setPlay(true);
          music(true);
        })();
    isStop
      ? setStop(false)
      : (() => {
          setStop(true);
          music(true);
        })();
  };
  return (
    <div className="audioMessage">
      <div
        style={{ width: progress + "%" }}
        className={"audioMessage__progress" + props.isMe ? " audioMessage__not-mineAudio" : ""}
      ></div>
      <div className={"myAudioMessage__content"}>
        <div
          onClick={play}
          style={{ display: isPlay ? "block" : "none" }}
          className="audioMessage__toggle"
        >
          <img
            className="audioMessage__toggle-img-stop"
            src="https://www.pngarts.com/files/2/Pause-PNG-Picture.png"
            alt="toggle-play"
          />
        </div>
        <div
          onClick={play}
          style={{ display: isStop ? "block" : "none" }}
          className="audioMessage__toggle"
        >
          <img
            className="audioMessage__toggle-img-play"
            src="https://cdn.onlinewebfonts.com/svg/img_102497.png"
            alt="toggle-play"
          />
        </div>
        <svg
          width="109"
          height="30"
          viewBox="0 0 109 30"
          fill={"black"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 0H12V30H14V0ZM6 7H8V24H6V7ZM31 9H29V21H31V9ZM2 11H0V19H2V11ZM59 13H57V18H59V13ZM46 11H48V19H46V11ZM93 11H91V19H93V11ZM107 11H109V19H107V11ZM20 7H18V24H20V7ZM35 7H37V24H35V7ZM53 7H51V24H53V7ZM69 7H71V24H69V7ZM87 7H85V24H87V7ZM102 7H104V24H102V7ZM24 0H26V30H24V0ZM43 0H41V30H43V0ZM63 0H65V30H63V0ZM76 0H74V30H76V0ZM80 0H82V30H80V0ZM98 0H96V30H98V0Z"
            fill={"black"}
          />
        </svg>

        <audio
          ref={audioEl}
          id="audioMesasage"
          controls
          src="https://zvukipro.com/uploads/files/2019-04/1554211218_morning-meadow-birdsongs-looping_zyb7nhnu.mp3"
        ></audio>
        <div className="audioMessage_date">{time}</div>
      </div>
    </div>
  );
};

export default AudioMessage;
