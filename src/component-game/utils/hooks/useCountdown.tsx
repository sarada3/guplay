import { useState, useRef, useEffect } from "react";

function useCountdown(initNum: number) {
  const [countdown, setCountdown] = useState(initNum);
  const countdownTimer = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => {
      // clear countdown interval
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
    };
  }, []);
  // setInterval, clearInterval등은 이 useCountdown을 사용하는 컴포넌트에서는 not concern.
  useEffect(() => {
    if (countdown < 0) {
      if (countdownTimer.current) {
        console.log("clear countdown in conditional");
        clearInterval(countdownTimer.current);
      }
    }
  }, [countdown]);
  return { countdown };
}

export default useCountdown;
