import { keyframes } from "styled-components";

export const k_sliding = (xDiff: number, yDiff: number) => keyframes`
  0% {
    transform: translateX(0px) translateY(0px);
  }
  100% {
    transform: translateX(${xDiff}px) translateY(${yDiff}px);
  }
`;

export const k_rotateY = (start: string, end: string) => keyframes`
  0% {
    transform: rotateY(${start});
  }
  100% {
    transform: rotateY(${end});
  }
`;

export const k_rotateY_360 = () => keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;

/**
 * [todo] 같은 동작을 하는 keyframe을 작동시킬 때
 * 다른 keyframes 객체를 전달해야 trigger 되는 듯함. 더 알아볼 것
 */
export const k_rotateY_360_re = () => keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;
