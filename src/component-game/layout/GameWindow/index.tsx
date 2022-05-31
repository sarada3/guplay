import styled from "styled-components";
import { createPortal } from "react-dom";

import Header from "./Header";
import Lobby from "./Lobby";
import Ranking from "./Ranking";

import { IGame } from "../../../types";

interface GameWindowProps {
  game: IGame;
  dispatchGameLike: (
    currentLike: boolean,
    userId: string,
    currentGameId: string
  ) => void;
  closeGameWindow: () => void;
  children: React.ReactNode;
}

function GameWindow(props: GameWindowProps) {
  const { game, dispatchGameLike, closeGameWindow, children } = props;

  const gameDom = document.getElementById("game") as HTMLElement;

  return createPortal(
    <Container>
      <InnerContainer>
        {/* <MobileLayoutRouter lobbyExist={game.category === "multi"} /> */}
        <Header
          game={game}
          dispatchGameLike={dispatchGameLike}
          closeGameWindow={closeGameWindow}
        />
        <Lobby />
        {children}
        <Ranking rankingList={game.rankings} difficulties={game.difficulties} />
      </InnerContainer>
    </Container>,
    gameDom
  );
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(136, 136, 136, 0.7);
`;

const InnerContainer = styled.section`
  position: relative;
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 50px 1fr;
  grid-template-areas:
    "header header header"
    "lobby game ranking";
  border: 1px solid black;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    width: 95%;
    height: 95%;
    grid-template-columns: 100%;
    grid-template-rows: 10% 90%;
    grid-template-areas:
      "header"
      "lobby_game_ranking";
    overflow-x: hidden;
  }
`;

export default GameWindow;