import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import Board from "./Board";
import Timer from "../../../Timer";
import {
  FlexCenter,
  TextTitle,
} from "../../../../component-reuse/StyledComponent";

import useCountdown from "../../../utils/hooks/useCountdown";
import { shuffleArr } from "./utils";

export type BlockEffect = "none" | "in" | "out";

export type Block = {
  num: number;
  effect: BlockEffect;
};

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
  const [blockArr, setBlockArr] = useState<Array<Block>>(
    shuffleArr(
      new Array(lastNum / 2)
        .fill(0)
        .map((v, i) => ({ num: i + 1, effect: "none" }))
    )
  );
  const [correct, setCorrect] = useState(1);
  const { countdown } = useCountdown(1);

  const onClickBlock = (numClicked: number) => {
    if (numClicked !== correct) {
      console.log("not correct");
      return;
    }

    let selector = "";
    if (numClicked <= lastNum / 2) selector = "change block";
    else if (numClicked !== lastNum) selector = "disappear block";
    else selector = "end";

    let newBlockArr: Array<Block> = [];
    switch (selector) {
      case "change block":
        const targetIndex = blockArr.findIndex(
          (block) => block.num === numClicked
        );
        newBlockArr = [
          ...blockArr.slice(0, targetIndex),
          { num: numClicked + lastNum / 2, effect: "in" },
          ...blockArr.slice(targetIndex + 1),
        ];
        setBlockArr(newBlockArr);
        break;
      case "disappear block":
        const disappearIndex = blockArr.findIndex(
          (block) => block.num === numClicked
        );
        newBlockArr = [
          ...blockArr.slice(0, disappearIndex),
          { num: -1, effect: "out" },
          ...blockArr.slice(disappearIndex + 1),
        ];
        setBlockArr(newBlockArr);
        break;
      case "end":
        handleGameEnd();
        break;
      default:
        break;
    }
    setCorrect((prev) => prev + 1);
  };
  useEffect(() => {
    if (countdown === 0) {
      saveStarttime();
    }
  }, [countdown, saveStarttime]);
  return (
    <Container>
      <Timer isActive={countdown < 1} />
      <Board
        boardWidth={boardWidth}
        blockArr={blockArr}
        onClickBlock={onClickBlock}
      />
      {countdown > 0 && (
        <Countdown>
          <CountdownText>{countdown}</CountdownText>
        </Countdown>
      )}
    </Container>
  );
}

const Container = styled(FlexCenter)`
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Countdown = styled(FlexCenter)`
  position: absolute;
  inset: 0;
  background-color: rgba(20, 20, 20, 0.5);
`;

const CountdownText = styled(TextTitle)`
  color: white;
`;

export default Onetofifty;
