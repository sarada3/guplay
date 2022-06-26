import { useState, useRef, useEffect } from "react";

/**
 *
 * @param initNum - countdown 수
 * @param delay - countdown 시작 전 딜레이
 */
function useCountdown(initNum: number, delay: number) {
  const [countdown, setCountdown] = useState(initNum);
  const countdownTimer = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    setTimeout(() => {
      countdownTimer.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }, delay);
    return () => {
      // clear countdown interval
      if (countdownTimer.current) {
        clearInterval(countdownTimer.current);
      }
    };
  }, [delay]);
  // setInterval, clearInterval등은 이 useCountdown을 사용하는 컴포넌트에서는 not concern.
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
