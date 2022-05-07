import styled from "styled-components";
import { useState } from "react";
import { useGameContext } from "../../../utils/hooks/useContextCustom";

import { shuffleArr } from "../../../utils";

import { GameWindow, Header, Lobby, Ranking, Intro } from "../../reuse/Layout";

import { GameStateType } from "../../../types";

// const defaultCardList = [
//   card1,
//   card2,
//   card3,
//   card4,
//   card5,
//   card6,
//   card7,
//   card8,
//   card9,
//   card10,
//   card11,
//   card12,
// ].map((card) => ({
//   url: card,
//   flip: "none",
// }));

function Flipcard() {
  const [gameState, setGameState] = useState<GameStateType>("init");
  const { game } = useGameContext();
  console.log(game);
  // const [cardList, setCardList] = useState(shuffleArr(defaultCardList));
  return (
    <GameWindow>
      <Header game={game} />
      <Lobby />
      {gameState === "init" ? (
        <Intro title={game.title} creator={game.creator} />
      ) : (
        <Container></Container>
      )}
      <Ranking />
    </GameWindow>
  );
}

const Container = styled.div`
  grid-area: game;
`;

export default Flipcard;
