import BlockItem from "./BlockItem";

import styled from "styled-components";

import { Block } from "./types";

interface BlockBoardProps {
  boardWidth: number;
  numOfBlockPerLine: number;
  blockArr: Array<Block>;
  onClickBlock: (num: number) => void;
}

function BlockBoard(props: BlockBoardProps) {
  const { boardWidth, numOfBlockPerLine, blockArr, onClickBlock } = props;
  return (
    <Container boardWidth={boardWidth} numOfBlockPerLine={numOfBlockPerLine}>
      {blockArr.map((block, index) => (
        <BlockItem key={index} block={block} onClickBlock={onClickBlock} />
      ))}
    </Container>
  );
}

/**
 * board만 layer 승격,
 * BlockItem들을 모두 composition layer로 분리하면 메모리 낭비일듯. block클릭 시 board layer 전체를 repaint한다.
 */
const Container = styled.div<{
  boardWidth: number;
  numOfBlockPerLine: number;
}>`
  padding: ${(props) => 50 / props.numOfBlockPerLine}%;
  position: relative;
  width: ${(props) => props.boardWidth}px;
  height: ${(props) => props.boardWidth}px;
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.numOfBlockPerLine}, 1fr)`};
  grid-template-columns: ${(props) =>
    `repeat(${props.numOfBlockPerLine}, 1fr)`};
  grid-gap: 4px;
  font-size: ${(props) => 100 / props.numOfBlockPerLine}px;
  transform: translateZ(0);
`;

export default BlockBoard;
