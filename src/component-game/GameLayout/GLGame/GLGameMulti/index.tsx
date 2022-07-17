import GLGameMultiIntro from "./GLGameMultiIntro";
import GLGameMultiResult from "./GLGameMultiResult";

import styled from "styled-components";
import { useState, useCallback, Suspense, lazy } from "react";

import { GameStateType, IGame, IRanking, IUser } from "../../../../types";

const Omok = lazy(() => import("../../../games/multi/Omok"));

interface GLGameMultiProps {
  user: IUser | null;
  game: IGame;
  boardWidth: number;
  dispatchGameRanking: (newRanking: IRanking) => void;
  startLoading: () => void;
  endLoading: () => void;
  invokeError: () => void;
}

function GLGameMulti(props: GLGameMultiProps) {
  const {
    user,
    game,
    boardWidth,
    dispatchGameRanking,
    startLoading,
    endLoading,
    invokeError,
  } = props;
  const [gameState, setGameState] = useState<GameStateType>("intro");
  if (!user) {
    alert("Login plz");
  }
  return (
    <Container>
      <Suspense>
        {gameState === "intro" ? (
          <GLGameMultiIntro game={game} />
        ) : gameState === "playing" ? (
          game.code === "omok" ? (
            <Omok boardWidth={boardWidth} />
          ) : null
        ) : gameState === "result" ? (
          <GLGameMultiResult user={user} />
        ) : null}
      </Suspense>
    </Container>
  );
}

const Container = styled.div``;

export default GLGameMulti;
