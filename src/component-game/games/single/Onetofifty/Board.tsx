import BlockItem from "./BlockItem";

import styled from "styled-components";

import { Block } from "./types";

interface BoardProps {
  boardWidth: number;
  numOfBlockPerLine: number;
  blockArr: Array<Block>;
  onClickBlock: (num: number) => void;
}

function Board(props: BoardProps) {
  const { boardWidth, numOfBlockPerLine, blockArr, onClickBlock } = props;
  return (
    <Container boardWidth={boardWidth} numOfBlockPerLine={numOfBlockPerLine}>
      {blockArr.map((block, index) => (
        <BlockItem key={index} block={block} onClickBlock={onClickBlock} />
      ))}
    </Container>
  );
}

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
`;

export default Board;
