import GLGameSingle from "./GLGameSingle";

import styled from "styled-components";
import React, { useState, useEffect, useRef, lazy } from "react";

import { IGame, IRanking, IUser } from "../../../types";

const Omok = lazy(() => import("../../games/multi/Omok"));

interface GLGameProps {
  user: IUser | null;
  game: IGame;
  dispatchGameRanking: (newRanking: IRanking) => void;
  startLoading: () => void;
  endLoading: () => void;
  invokeError: () => void;
}

/**
 * game context에 있는 game.code에 따라
 * 해당 게임의 코드를 lazy loading한다.
 */
function GLGame(props: GLGameProps) {
  console.log("GLGame");
  const {
    user,
    game,
    dispatchGameRanking,
    startLoading,
    endLoading,
    invokeError,
  } = props;
  const [boardWidth, setBoardWidth] = useState(0);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 뷰포트 크기에 맞는 게임보드 사이즈(정사각) 결정
    if (gameContainerRef.current) {
      const gameContainerWidth = gameContainerRef.current.clientWidth;
      const gameContainerHeight = gameContainerRef.current.clientHeight;
      const currentBoardLength = Math.min(
        gameContainerWidth,
        gameContainerHeight * 0.9
      );
      setBoardWidth(currentBoardLength);
    }
  }, []);
  console.log(boardWidth);
  return (
    <Container ref={gameContainerRef}>
      {boardWidth === 0 ? null : game.category === "single" ? (
        <GLGameSingle
          game={game}
          user={user}
          boardWidth={boardWidth}
          dispatchGameRanking={dispatchGameRanking}
          startLoading={startLoading}
          endLoading={endLoading}
          invokeError={invokeError}
        />
      ) : null}
    </Container>
  );
}

const Container = styled.div`
  grid-area: game;
  z-index: 3;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) 0 0/300%
    300%;
  /* transform: translateZ(0); */
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    grid-area: lobby_game_ranking;
    position: absolute;
    inset: 0;
  }
`;

export default React.memo(
  GLGame,
  (prev, next) => prev.game.id === next.game.id
);
