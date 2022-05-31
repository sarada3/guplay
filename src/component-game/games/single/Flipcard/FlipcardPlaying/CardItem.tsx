import styled, { keyframes, css } from "styled-components";
import React from "react";

import { FlexCenter } from "../../../../../component-reuse/StyledComponent";
import { Card } from "../index";

const k_sliding = (xDiff: number, yDiff: number) => keyframes`
  0% {
    transform: translateX(0px) translateY(0px);
  }
  100% {
    transform: translateX(${xDiff}px) translateY(${yDiff}px);
  }
`;
const k_rotateY = (start: string, end: string) => keyframes`
  0% {
    transform: rotateY(${start});
  }
  100% {
    transform: rotateY(${end});
  }
`;
const k_rotateY_360 = () => keyframes`
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(0deg);
  }
`;
const k_rotateY_360_re = () => keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

interface CardItemProps {
  index: number;
  card: Card;
  cardWidth: number;
  onClickCard: (targetIndex: number) => void;
}

function CardItem(props: CardItemProps) {
  const { index, card, cardWidth, onClickCard } = props;

  return (
    <Container
      index={index}
      cardWidth={cardWidth}
      translateX={card.translate.x}
      translateY={card.translate.y}
      onClick={() => onClickCard(index)}
    >
      <InnerContainer state={card.state}>
        <Back></Back>
        <Front>
          <FrontImg src={card.url} alt={`card number ${card.no}`} />
        </Front>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div<{
  index: number;
  cardWidth: number;
  translateX: number;
  translateY: number;
}>`
  position: absolute;
  // 가운데에서 펼칠 때 위쪽(z-index가 큰) 카드부터 펼치는 애니메이션을 위함
  // todo upgrade: z-index를 따로 설정하지 않고 index에 따라 순서대로 랜더링 후 translate 애니메이션을 뒤쪽순서부터 하면 됨
  z-index: ${(props) => 100 - props.index};
  padding: 3px;
  width: ${(props) => props.cardWidth}px;
  height: ${(props) => props.cardWidth}px;
  border-radius: 20px;
  overflow: hidden;
  ${(props) => css`
    animation: 0.1s linear ${props.index / 20}s
      ${k_sliding(props.translateX, props.translateY)} forwards;
  `};
`;

// re: 다른 keyframe을 전달해야 애니메이션을 발동시킴.

// 180deg: 열린상태, 0deg: 뒤쪽
const InnerContainer = styled.div<{ state: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: ${(props) =>
    props.state === "close" || props.state === "unmatch_temp_close"
      ? "rotateY(180deg)"
      : "rotateY(0deg)"};
  ${(props) => {
    if (props.state === "open") {
      return css`
        animation: 0.3s ${k_rotateY("0deg", "180deg")} 0s linear forwards;
      `;
    } else if (props.state === "close") {
      return css`
        animation: 0.3s ${k_rotateY("180deg", "0deg")} 0s linear forwards;
      `;
    } else if (props.state === "unmatch_temp_close") {
      return css`
        animation: 0.3s ${k_rotateY("180deg", "0deg")} 0.3s linear forwards;
      `;
    } else if (props.state === "unmatch_target_close") {
      return css`
        animation: 0.6s ${k_rotateY_360()} 0s linear forwards;
      `;
    } else if (props.state === "re_unmatch_target_close") {
      return css`
        animation: 0.6s ${k_rotateY_360_re()} 0s linear forwards;
      `;
    }
  }}
`;

const InnerItem = styled(FlexCenter)`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const Back = styled(InnerItem)`
  background: orange;
`;

const Front = styled(InnerItem)`
  /* background: red; */
  transform: rotateY(180deg);
`;

const FrontImg = styled.img`
  position: absolute;
  width: 60%;
  height: 60%;
`;

// export default React.memo(CardItem, (prevProps, nextProps) => {
//   if (prevProps.card.state === nextProps.card.state) {
//     return true;
//   } else {
//     return false;
//   }
// });

export default CardItem;
