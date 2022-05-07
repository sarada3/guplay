import styled, { keyframes, css } from "styled-components";

const numStrsSecond = Array.from(Array(60).keys(), (num) =>
  (num + "").padStart(2, "0")
);

const numStrsCentiSecond: Array<string> = [];
for (let i = 0; i < 100; i += 3) {
  numStrsCentiSecond.push((i + "").padStart(2, "0"));
}

const tempKeyframes = (step: number) => keyframes`
  0% {
    margin-top: 0px;
  }
  100% {
    margin-top: -${step * 100}px;
  }
`;

interface TimerSecondsProps {
  timerEnd: boolean;
}

function TimerSeconds(props: TimerSecondsProps) {
  const { timerEnd } = props;
  if (timerEnd) {
    return <span>00:00</span>;
  }
  return (
    <>
      <Numbers duration={60} step={numStrsSecond.length}>
        {numStrsSecond.map((num) => (
          <Num key={num}>{num}</Num>
        ))}
      </Numbers>
      <span>:</span>
      <Numbers duration={1} step={numStrsCentiSecond.length}>
        {numStrsCentiSecond.map((num) => (
          <Num key={num}>{num}</Num>
        ))}
      </Numbers>
    </>
  );
}

const Numbers = styled.div<{ duration: number; step: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${(props) =>
    css`
      ${tempKeyframes(
        props.step
      )} ${props.duration}s infinite steps(${props.step})
    `};
`;

const Num = styled.span`
  flex: 0 0 100px;
`;

export default TimerSeconds;
