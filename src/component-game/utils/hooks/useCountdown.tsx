import { useState, useRef, useEffect } from "react";

function useCountdown() {
  const [countdown, setCountdown] = useState(3);
  const countdownTimer = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => {
      if (countdownTimer.current) {
        console.log("clear countdown in useeffect return");
        clearInterval(countdownTimer.current);
      }
    };
  }, []);
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
