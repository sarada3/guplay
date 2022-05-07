import { useState, useEffect, useRef } from "react";

interface TimerMinutesProps {
  handleTimeEnd: () => void;
}

function TimerMinutes(props: TimerMinutesProps) {
  const { handleTimeEnd } = props;

  const [minute, setMinute] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setMinute((prev) => prev + 1);
    }, 60000);
    return () => {
      if (timerRef.current) {
        console.log("clear interval");
        clearInterval(timerRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (minute > 59) {
      if (timerRef.current) {
        console.log("clear interval");
        clearInterval(timerRef.current);
        setMinute(0);
        handleTimeEnd();
        alert("Time end");
      }
    }
  }, [minute, handleTimeEnd]);
  return <span>{minute < 10 ? `0${minute}` : minute}</span>;
}

export default TimerMinutes;
