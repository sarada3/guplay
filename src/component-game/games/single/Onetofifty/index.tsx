import styled from "styled-components";
import { useEffect } from "react";

import Timer from "../../../Timer";

import useCountdown from "../../../utils/hooks/useCountdown";

interface OnetofiftyProps {
  boardWidth: number;
  saveStarttime: () => void;
  handleGameEnd: () => void;
  startLoading: () => void;
  endLoading: () => void;
  invokeError: () => void;
  lastNum: number;
}

function Onetofifty(props: OnetofiftyProps) {
  const {
    boardWidth,
    saveStarttime,
    handleGameEnd,
    startLoading,
    endLoading,
    invokeError,
    lastNum,
  } = props;
  const { countdown } = useCountdown();
  useEffect(() => {
    if (countdown === 0) {
      alert("start!");
    }
  }, [countdown]);
  return <Container>Onetofifty{countdown}</Container>;
}

const Container = styled.div``;

export default Onetofifty;
