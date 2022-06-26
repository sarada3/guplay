import styled from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";

import Board from "./Board";
import Timer from "../../../Timer";
import {
  FlexCenter,
  TextTitle,
} from "../../../../component-reuse/StyledComponent";

import useCountdown from "../../../utils/hooks/useCountdown";
import { shuffleArr } from "./utils";

// let canClick = false;

export type BlockEffect = "none" | "in" | "out";

export type Block = {
  num: number;
  effect: BlockEffect;
};

interface OnetofiftyProps {
  boardWidth: number;
  numOfBlockPerLine: number;
  saveStarttime: () => void;
  handleGameEnd: () => void;
}

function Onetofifty(props: OnetofiftyProps) {
  const { boardWidth, saveStarttime, handleGameEnd, numOfBlockPerLine } = props;
  const lastNum = numOfBlockPerLine * numOfBlockPerLine * 2;
  const [blockArr, setBlockArr] = useState<Array<Block>>(
    shuffleArr(
      new Array(lastNum / 2)
        .fill(0)
        .map((v, i) => ({ num: i + 1, effect: "none" }))
    )
  );
  const [clicked, setClicked] = useState(-1);
  const [correct, setCorrect] = useState(1);
  const { countdown } = useCountdown(3, 0);
  const canClick = useRef(false);

  const onClickBlock = useCallback((numClicked: number) => {
    console.log("canClick.current", canClick.current);
    if (canClick.current) {
      setClicked(numClicked);
    }
  }, []);

  /**
   * 정답인 경우 useEffect 실행흐름
   * 1) clicked state 변경되었기 때문에 다시랜더링 되면서 useEffect 실행됨
   * 2) clicked === correct 이기 때문에 if문 실행되고 blockArr, correct state 변경
   * 3) blockArr, correct state 변경되었기때문에 다시 랜더링 되면서 useEffect가 두번째 실행되지만
   * 4) clicked === correct가 false이기 때문에 if문 실행되지 않음
   */
  useEffect(() => {
    if (clicked === correct) {
      canClick.current = false;
      let selector = "";
      if (clicked <= lastNum / 2) selector = "change block";
      else if (clicked !== lastNum) selector = "disappear block";
      else selector = "end";

      let newBlockArr: Array<Block> = [];

      switch (selector) {
        case "change block":
          const targetIndex = blockArr.findIndex(
            (block) => block.num === clicked
          );
          newBlockArr = [
            ...blockArr.slice(0, targetIndex),
            { num: clicked + lastNum / 2, effect: "in" },
            ...blockArr.slice(targetIndex + 1),
          ];
          setBlockArr(newBlockArr);
          break;
        case "disappear block":
          const disappearIndex = blockArr.findIndex(
            (block) => block.num === clicked
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
      canClick.current = true;
    }
  }, [clicked, correct, lastNum, blockArr, handleGameEnd]);

  useEffect(() => {
    if (countdown < 1) {
      saveStarttime();
      canClick.current = true;
    }
  }, [countdown, saveStarttime]);
  return (
    <Container>
      <Timer isActive={countdown < 1} />
      <Board
        boardWidth={boardWidth}
        numOfBlockPerLine={numOfBlockPerLine}
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
