import styled from "styled-components";

import { k_scale_in, k_scale_out } from "./animations/keyframes";

import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import { Block, BlockEffect } from ".";

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
  blockWidthPercentage: number;
  onClickBlock: (num: number) => void;
}

function BlockItem(props: BlockItemProps) {
  const { block, blockWidthPercentage, onClickBlock } = props;
  return (
    <Container
      effect={block.effect}
      blockWidthPercentage={blockWidthPercentage}
      onClick={() => onClickBlock(block.num)}
    >
      <InnerContainer>{block.num !== -1 && block.num}</InnerContainer>
    </Container>
  );
}

const Container = styled(FlexCenter)<{
  blockWidthPercentage: number;
  effect: BlockEffect;
}>`
  padding: 2px;
  width: ${(props) => props.blockWidthPercentage}%;
  transform: ${(props) => (props.effect === "in" ? "scale(0)" : "scale(1)")};
  animation: ${(props) => getKeyframe(props.effect)} 0.2s forwards;
`;

const InnerContainer = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  background: yellow;
  border-radius: 10px;
`;

export default BlockItem;
