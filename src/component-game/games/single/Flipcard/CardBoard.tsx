import styled from "styled-components";

import { Card } from "./flipcardTypes";

import CardItem from "./CardItem";

interface CardBoardProps {
  cardList: Array<Card>;
  boardWidth: number;
  cardWidth: number;
  countdown: number;
  onClickCard: (targetIndex: number) => void;
}

function CardBoard(props: CardBoardProps) {
  const { cardList, boardWidth, cardWidth, countdown, onClickCard } = props;

  return (
    <Container boardWidth={boardWidth}>
      <CenterCountdown cardWidth={cardWidth}>
        {countdown < 6 && countdown > 0 && countdown}
      </CenterCountdown>
      {cardList.map((card, index) => (
        <CardItem
          key={index}
          card={card}
          index={index}
          cardWidth={cardWidth}
          onClickCard={onClickCard}
        />
      ))}
    </Container>
  );
}

const Container = styled.div<{ boardWidth: number }>`
  position: relative;
  width: ${(props) => props.boardWidth}px;
  height: ${(props) => props.boardWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterCountdown = styled.div<{
  cardWidth: number;
}>`
  position: absolute;
  width: ${(props) => props.cardWidth}px;
  height: ${(props) => props.cardWidth}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  color: white;
  font-weight: 600;
`;

export default CardBoard;
