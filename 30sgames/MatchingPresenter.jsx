import React from "react";
import styled from "styled-components";
import styleVariables from "styleVariables";
import Summary from "Components/Summary";
import Checkboard from "Components/Checkboard";
import Timer from "Components/Timer";
import Rank from "Components/Rank";
import { Icon, ActionBtn } from "styleVariables";

import reloadURL from "assets/images/reload.png";

const MatchingPresenter = ({
  cards,
  timeElapsed,
  score,
  isPlaying,
  ActionBtnType,
  records,
  isSubmitModalOpen,
  handleClick,
  handleStart,
  handleReset,
  handleSubmit,
  handleCloseModal,
}) => (
  <Container>
    <Summary title="짝 맞추기">똑같은 카드를 맞춰보세요.</Summary>
    <Timer timeElapsed={timeElapsed} />
    <Checkboard
      type="matching"
      values={cards}
      handleClick={handleClick}
      isPlayingMatching={isPlaying}
    />

    {ActionBtnType === 1 ? (
      <ActionBtn onClick={handleStart}>
        <Start>start</Start>
      </ActionBtn>
    ) : ActionBtnType === 2 ? (
      <ActionBtn onClick={handleReset}>
        <Icon size={25} src={reloadURL} />
      </ActionBtn>
    ) : (
      <Arrow>↑↑↑↑↑</Arrow>
    )}
    <Rank
      type={1}
      records={records}
      score={score}
      isSubmitModalOpen={isSubmitModalOpen}
      handleSubmit={handleSubmit}
      handleCloseModal={handleCloseModal}
    />
  </Container>
);

const Container = styled.div`
  grid-column: 2 / 3;
  grid-row: 4 / 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid white;
  border-top: none;
  @media (max-width: ${styleVariables.tabletWidth}) {
    grid-column: 1 / 2;
  }
`;

const Start = styled.div`
  height: 25px;
  text-align: center;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
`;

const Arrow = styled.div`
  width: 25px;
  height: 27px;
  margin: 20px 0;
  padding: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  animation: bounce 1s infinite;
  transform-origin: bottom;
  @keyframes bounce {
    0% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(1.3);
    }
    100% {
      transform: scaleY(0.9);
    }
  }
`;

export default MatchingPresenter;
