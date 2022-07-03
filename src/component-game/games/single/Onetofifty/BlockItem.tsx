import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import { k_scale_in, k_scale_out } from "./animations/keyframes";

import styled from "styled-components";
import { memo } from "react";

import { Block, BlockEffect } from "./types";

const getKeyframe = (effect: BlockEffect) => {
  if (effect === "none") {
    return;
  } else if (effect === "in") {
    return k_scale_in();
  } else {
    return k_scale_out();
  }
};

interface BlockItemProps {
  block: Block;
  onClickBlock: (num: number) => void;
}

function BlockItem(props: BlockItemProps) {
  const { block, onClickBlock } = props;
  return (
    <Container effect={block.effect} onClick={() => onClickBlock(block.num)}>
      <InnerContainer>{block.num !== -1 && block.num}</InnerContainer>
    </Container>
  );
}

const Container = styled(FlexCenter)<{ effect: BlockEffect }>`
  transform: ${(props) => (props.effect === "in" ? "scale(0)" : "scale(1)")};
  animation: ${(props) => getKeyframe(props.effect)} 0.2s forwards;
  cursor: pointer;
`;

const InnerContainer = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  background: yellow;
  border-radius: 3px;
`;

export default memo(
  BlockItem,
  (prev, next) => prev.block.num === next.block.num
);
