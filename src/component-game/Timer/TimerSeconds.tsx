import styled, { keyframes, css } from "styled-components";

const numStrsSecond = Array.from(Array(60).keys(), (num) =>
  (num + "").padStart(2, "0")
);

/**
 * 1cs 단위까지는 어차피 눈이 인식 못하므로 3씩 건너뛰는게 나을듯
 * 더 나은건 gif 파일 사용하는것.
 */
const numStrsCentiSecond: Array<string> = [];
for (let i = 0; i < 100; i += 3) {
  numStrsCentiSecond.push((i + "").padStart(2, "0"));
}

const k_sliding_Y = (step: number) => keyframes`
  0% {
    transform: translateY(0)
  }
  100% {
    transform: translateY(-${step * 100}px);
  }
`;

interface TimerSecondsProps {
  timerEnd: boolean;
}

function TimerSecondsTemp(props: TimerSecondsProps) {
  const { timerEnd } = props;
  if (timerEnd) {
    return <span>00:00</span>;
  }
  return (
    <>
      <Second duration={60} step={numStrsSecond.length}>
        {numStrsSecond.map((num) => (
          <Num key={num}>{num}</Num>
        ))}
      </Second>
      <span>:</span>
      <Second duration={1} step={numStrsCentiSecond.length}>
        {numStrsCentiSecond.map((num) => (
          <Num key={num}>{num}</Num>
        ))}
      </Second>
    </>
  );
}

const Second = styled.div<{ duration: number; step: number }>`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${(props) =>
    css`
      ${k_sliding_Y(
        props.step
      )} ${props.duration}s infinite steps(${props.step})
    `};
`;

const Num = styled.span`
  flex: 0 0 100px;
`;

export default TimerSecondsTemp;
