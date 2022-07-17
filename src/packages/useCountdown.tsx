import { useState, useRef, useEffect } from "react";

/**
 *
 * @param initNum - countdown second
 * @param delay - countdown 시작 전 딜레이
 */
function useCountdown(initNum: number, delay: number) {
  const [countdown, setCountdown] = useState(initNum);
  const countdownTimer = useRef<ReturnType<typeof setInterval>>();

  //
  useEffect(() => {
    if (delay > -1) {
      setTimeout(() => {
        countdownTimer.current = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      }, delay * 1000);
    }
    return () => {
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
    };
  }, [delay]);

  useEffect(() => {
    if (countdown < 1) {
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
    }
  }, [countdown]);

  return { countdown };
}

export default useCountdown;
