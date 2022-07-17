import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import styled, { css } from "styled-components";
import { memo } from "react";

import { k_scale_in, k_scale_out } from "./animations/keyframes";

import { Block, BlockEffect } from "./types";

interface BlockItemProps {
  block: Block;
  onClickBlock: (num: number) => void;
}

function BlockItem(props: BlockItemProps) {
  console.log("BlockItem");
  const { block, onClickBlock } = props;
  return (
    <Container
      effect={block.effect}
      num={block.num}
      onClick={() => onClickBlock(block.num)}
    >
      <InnerContainer>{block.num !== -1 && block.num}</InnerContainer>
    </Container>
  );
}

const Container = styled(FlexCenter)<{ effect: BlockEffect; num: number }>`
  transform: ${(props) => (props.effect === "in" ? "scale(0)" : "scale(1)")};
  ${(props) => {
    if (props.effect === "none") {
      return null;
    } else if (props.effect === "in") {
      return css`
        animation: ${k_scale_in} 0.2s forwards;
      `;
    } else if (props.effect === "out") {
      return css`
        animation: ${k_scale_out} 0.2s forwards;
      `;
    }
  }};
  cursor: pointer;
`;

const InnerContainer = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: yellow;
`;

export default memo(BlockItem);
