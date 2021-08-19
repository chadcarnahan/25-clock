import React from "react";
import { useState, useEffect } from "react";
import sound from "./household_alarm_clock_beep_tone.mp3";
const App = () => {
  let defaultMinutes = 25;
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(defaultMinutes);
  const [sessionOrBreak, setSessionOrBreak] = useState("Session");
  const [playOrStop, setPlayOrStop] = useState(false);
  const [time, setTime] = useState(1500);

  const formatTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = time % 60;
    minute = minute < 10 ? String("0" + minute + ":") : String(minute + ":");
    second = second < 10 ? String("0" + second) : String(second);
    return minute + second;
  };

  useEffect(() => {
    if (playOrStop) {
      if (time !== 0) {
        window.tmr = setInterval(() => {
          document.getElementById("beep").pause();
          setTime(() => time - 1);
        }, 1000);
      } else {
        document.getElementById("beep").play();
        window.endInterval = setInterval(() => {
          sessionOrBreak === "Break"
            ? setSessionOrBreak("Session")
            : setSessionOrBreak("Break");
          setTime(() => breakLength * 60);
        }, 1000);
      }
    }
    return () => {
      clearInterval(window.tmr);
      clearInterval(window.endInterval);
      if (!playOrStop) {
        document.getElementById("beep").pause();
      }
    };
  });

  const reset = () => {
    setTime(1500);
    setBreakLength(5);
    setSessionLength(25);
    setSessionOrBreak("Session");
    setPlayOrStop(!playOrStop);
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime -= 30;
  };

  const increment = (func, stateVal) => {
    if (stateVal < 60) {
      setPlayOrStop(false);
      func(stateVal + 1);
      stateVal === sessionLength ? setTime((stateVal + 1) * 60) : setTime(time);
    } else {
      func(stateVal);
    }
  };

  const decrement = (func, stateVal) => {
    if (stateVal > 1) {
      setPlayOrStop(false);
      func(stateVal - 1);
      stateVal === sessionLength ? setTime((stateVal - 1) * 60) : setTime(time);
    } else {
      func(stateVal);
    }
  };

  return (
    <div id="app">
      <h1 id="title">25 + 5 Clock</h1>
      <div id="break-session">
        <div id="break">
          <h4 id="break-label">Break Length:</h4>
          <div id="break-buttons">
            <i
              className="bi bi-arrow-up-circle-fill"
              style={{ fontSize: "2rem" }}
              id="break-increment"
              onClick={() => increment(setBreakLength, breakLength)}
            ></i>
            <h4 id="break-length">{breakLength}</h4>
            <i
              className="bi bi-arrow-down-circle-fill"
              style={{ fontSize: "2rem" }}
              id="break-decrement"
              onClick={() => decrement(setBreakLength, breakLength)}
            ></i>
          </div>
        </div>
        <div id="session">
          <h4 id="session-label">Session Length:</h4>
          <div id="session-buttons">
            <i
              className="bi bi-arrow-up-circle-fill"
              style={{ fontSize: "2rem" }}
              id="session-increment"
              onClick={() => increment(setSessionLength, sessionLength)}
            ></i>
            <h4 id="session-length">{sessionLength}</h4>
            <i
              className="bi bi-arrow-down-circle-fill"
              style={{ fontSize: "2rem" }}
              id="session-decrement"
              onClick={() => decrement(setSessionLength, sessionLength)}
            ></i>
          </div>
        </div>
      </div>
      <div id="timer">
        <div id="timer-box">
          <h4 id="timer-label">{sessionOrBreak}</h4>
          <h4 id="time-left">{formatTime(time)}</h4>
        </div>
        <div id="controls">
          <i
            className="bi-play-circle-fill"
            onClick={() => setPlayOrStop(!playOrStop)}
            id="start_stop"
          >
            {" "}
          </i>
          <i
            className="bi bi-x-circle-fill"
            onClick={() => reset()}
            id="reset"
          ></i>
        </div>
      </div>
      <audio
        autoPlay={false}
        src={sound}
        id="beep"
        style={{ display: "hidden" }}
      />
    </div>
  );
};

export default App;
