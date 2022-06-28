import styled from "styled-components";
import { useState, useCallback } from "react";

import TimerMinutes from "./TimerMinutes";
import TimerSeconds from "./TimerSeconds";

interface TimerProps {
  isActive: boolean;
  /**
   * viewport height
   */
  size: number;
}

/**
 * setInterval으로 인해서 실제로 흐르는 시간을 랜더링하지 않고(CPU낭비)
 * animation을 활용해 숫자 string을 빠르게 이동시켜 실제 시간이 흐르는 듯한 화면을 출력한다.(GPU사용)
 */
function Timer(props: TimerProps) {
  const { isActive, size } = props;
  const [timerEnd, setTimerEnd] = useState(false);

  const handleTimeEnd = useCallback(() => {
    setTimerEnd(true);
  }, []);

  return (
    <Container size={size}>
      {isActive ? (
        <>
          <TimerMinutes handleTimeEnd={handleTimeEnd} />
          <span>:</span>
          <TimerSeconds timerEnd={timerEnd} />
        </>
      ) : (
        "00:00:00"
      )}
    </Container>
  );
}

const Container = styled.div<{ size: number }>`
  height: ${(props) => props.size}vh;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font: system-ui;
  font-size: ${(props) => props.size}vh;
`;

export default Timer;
