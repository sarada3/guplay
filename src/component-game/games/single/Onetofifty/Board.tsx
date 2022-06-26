import styled from "styled-components";

import BlockItem from "./BlockItem";

import { Block } from ".";

interface BoardProps {
  boardWidth: number;
  blockArr: Array<Block>;
  onClickBlock: (num: number) => void;
}

function Board(props: BoardProps) {
  const { boardWidth, blockArr, onClickBlock } = props;
  const numOfBlockPerLine = Math.sqrt(blockArr.length);
  const blockWidthPercentage = 100 / numOfBlockPerLine;
  const boardPaddingPercentage = blockWidthPercentage / 2;
  return (
    <Container
      boardWidth={boardWidth}
      blockWidthPercentage={blockWidthPercentage}
      boardPaddingPercentage={boardPaddingPercentage}
    >
      {blockArr.map((block, index) => (
        <BlockItem
          key={index}
          block={block}
          blockWidthPercentage={blockWidthPercentage}
          onClickBlock={onClickBlock}
        />
      ))}
    </Container>
  );
}

const Container = styled.div<{
  boardWidth: number;
  blockWidthPercentage: number;
  boardPaddingPercentage: number;
}>`
  padding: ${(props) => props.boardPaddingPercentage}%;
  position: relative;
  width: ${(props) => props.boardWidth}px;
  height: ${(props) => props.boardWidth}px;
  display: flex;
  flex-wrap: wrap;
`;

export default Board;
