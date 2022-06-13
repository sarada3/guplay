import styled from "styled-components";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";

import GameLayoutHeader from "./GameLayoutHeader";
import GameLayoutLobby from "./GameLayoutLobby";
import GameLayoutGame from "./GameLayoutGame";
import GameLayoutRanking from "./GameLayoutRanking";

import { IGame, IRanking, IUser } from "../../types";

const initialMobileRoute = {
  lobby: false,
  ranking: false,
};

interface GameLayoutProps {
  user: IUser | null;
  game: IGame;
  dispatchGameLike: (
    currentLike: boolean,
    userId: string,
    currentGameId: string
  ) => void;
  dispatchGameRanking: (newRanking: IRanking) => void;
  dispatchResetGame: () => void;
  startLoading: () => void;
  endLoading: () => void;
  invokeError: () => void;
}

/**
 * state
 * boardWidth: game창 크기 (정사각형, device 사이즈에 따라 연산)
 */
function GameLayout(props: GameLayoutProps) {
  const {
    user,
    game,
    dispatchGameLike,
    dispatchGameRanking,
    dispatchResetGame,
    startLoading,
    endLoading,
    invokeError,
  } = props;
  const [mobileRoute, setMobileRoute] = useState(initialMobileRoute);

  const onClickRouterLink = useCallback((route: string) => {
    setMobileRoute({
      ...initialMobileRoute,
      [route]: true,
    });
  }, []);
  const closeMobileRoutes = useCallback(() => {
    setMobileRoute(initialMobileRoute);
  }, []);
  const closeGameWindow = useCallback(() => {
    if (window.confirm("Are you sure to exit game?")) {
      dispatchResetGame();
    }
  }, [dispatchResetGame]);

  const gameDom = document.getElementById("game") as HTMLElement;
  return createPortal(
    <Container>
      <InnerContainer>
        <GameLayoutHeader
          game={game}
          dispatchGameLike={dispatchGameLike}
          onClickRouterLink={onClickRouterLink}
          closeGameWindow={closeGameWindow}
          invokeError={invokeError}
        />
        <GameLayoutLobby
          mobileOpen={mobileRoute.lobby}
          closeMobileRoutes={closeMobileRoutes}
        />
        <GameLayoutGame
          user={user}
          game={game}
          dispatchGameRanking={dispatchGameRanking}
          startLoading={startLoading}
          endLoading={endLoading}
          invokeError={invokeError}
        />
        <GameLayoutRanking
          mobileOpen={mobileRoute.ranking}
          closeMobileRoutes={closeMobileRoutes}
          rankingList={game.rankings}
          difficulties={game.difficulties}
        />
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
    grid-template-rows: 100px 1fr;
    grid-template-areas:
      "header"
      "lobby_game_ranking";
    overflow-x: hidden;
  }
`;

export default GameLayout;
