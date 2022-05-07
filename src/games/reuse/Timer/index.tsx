import styled from "styled-components";
import { useState, useCallback } from "react";

import TimerMinutes from "./TimerMinutes";
import TimerSeconds from "./TimerSeconds";

interface TimerProps {
  isActive: boolean;
}

function Timer(props: TimerProps) {
  const { isActive } = props;
  const [timerEnd, setTimerEnd] = useState(false);
  const handleTimeEnd = useCallback(() => {
    setTimerEnd(true);
  }, []);
  return (
    <Container>
      <Counter>
        {isActive ? (
          <>
            <TimerMinutes handleTimeEnd={handleTimeEnd} />
            <span>:</span>
            <TimerSeconds timerEnd={timerEnd} />
          </>
        ) : (
          "00:00:00"
        )}
      </Counter>
    </Container>
  );
}

const Container = styled.div`
  height: 40px;
  overflow: hidden;
`;

const Counter = styled.div`
  height: 100%;
  display: flex;
  font: system-ui;
  font-size: 40px;
  overflow: hidden;
`;

export default Timer;
