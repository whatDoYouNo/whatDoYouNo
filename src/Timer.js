import { useState, useEffect } from "react";

const Timer = ({ setTimer }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  let time = 0;
  let interval;

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(interval);
      setTimer(time);
    };
  }, []);

  const startTimer = () => {
    //timer that updates the value of minutes and seconds every second
    interval = setInterval(() => {
      time = time + 1;
      setMinutes(Math.floor(time / 60));
      setSeconds(Math.floor(time % 60));
    }, 1000);
  };

  return (
    <h3 className="timer">
      <span className="minute">{minutes}</span> : <span className="second">{seconds < 10 ? `0${seconds}` : seconds}</span>
    </h3>
  );
};

export default Timer;
