import GLGameSingleIntro from "./GLGameSingleIntro";
import GLGameSingleResult from "./GLGameSingleResult";

import styled from "styled-components";
import { useState, useCallback, Suspense, lazy } from "react";

import { updateRankingSingle } from "../../../../utils/db";

import { GameStateType, IGame, IUser, IRanking } from "../../../../types";

const Onetofifty = lazy(() => import("../../../games/single/Onetofifty"));
const Flipcard = lazy(() => import("../../../games/single/Flipcard"));

interface GLGameSingleProps {
  user: IUser | null;
  game: IGame;
  boardWidth: number;
  dispatchGameRanking: (newRanking: IRanking) => void;
  startLoading: () => void;
  endLoading: () => void;
  invokeError: () => void;
}

function GLGameSingle(props: GLGameSingleProps) {
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
  const [startTime, setStartTime] = useState(-1);
  const [result, setResult] = useState({ record: -1, recordToRender: "" });
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    game.difficulties[0]
  );
  const onChangeDifficulty = (difficultyValue: string) => {
    setSelectedDifficulty(difficultyValue);
  };
  /**
   * countdown이 끝나고 게임이 시작함과 동시에
   * 현재시간을 startTime state에 저장.
   * 게임이 끝났을때 시간을 startTime과 비교하여 소요시간을 얻는다.
   */
  const saveStarttime = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
  }, []);
  const handleGameEnd = useCallback(() => {
    if (startTime !== -1) {
      const timeElapsed = Date.now() - startTime;
      const minute = Math.floor(timeElapsed / (1000 * 60));
      const second = ((timeElapsed % (1000 * 60)) / 1000).toFixed(2);
      const recordToRender =
        minute > 0 ? `${minute}m ${second}s` : `${second}s`;
      setResult({ record: timeElapsed, recordToRender });
      setGameState("result");
    } else {
      console.error("startTime is -1. Something goes wrong");
      invokeError();
    }
  }, [startTime, invokeError]);
  const registerRanking = useCallback(async () => {
    if (user) {
      startLoading();
      const response = await updateRankingSingle(
        user,
        game.id,
        selectedDifficulty,
        result.record,
        result.recordToRender
      );
      if (response) {
        if (response.status === "noupdate") {
          alert("No update. You already have higher record");
        } else if (response.ranking) {
          if (response.status === "new") {
            alert("Your record has been published.");
          } else if (response.status === "update") {
            alert("Congratulation! You set a new record!");
          }
          dispatchGameRanking(response.ranking);
        }
      } else {
        invokeError();
      }
      endLoading();
    }
  }, [
    user,
    game.id,
    selectedDifficulty,
    result,
    dispatchGameRanking,
    startLoading,
    endLoading,
    invokeError,
  ]);
  const onClickRetry = () => {
    setGameState("intro");
  };
  const enterToPlaying = () => {
    if (boardWidth !== 0) {
      setGameState("playing");
    }
  };
  return (
    <Container>
      <Suspense>
        {gameState === "intro" ? (
          <GLGameSingleIntro
            game={game}
            enterToPlaying={enterToPlaying}
            selectedDifficulty={selectedDifficulty}
            onChangeDifficulty={onChangeDifficulty}
          />
        ) : gameState === "playing" ? (
          game.code === "flipcard" ? (
            <Flipcard
              boardWidth={boardWidth}
              saveStarttime={saveStarttime}
              handleGameEnd={handleGameEnd}
              startLoading={startLoading}
              endLoading={endLoading}
              invokeError={invokeError}
              numOfCardPerLine={Number(selectedDifficulty.charAt(0))}
            />
          ) : game.code === "onetofifty" ? (
            <Onetofifty
              boardWidth={boardWidth}
              saveStarttime={saveStarttime}
              handleGameEnd={handleGameEnd}
              numOfBlockPerLine={Number(selectedDifficulty.charAt(0))}
            />
          ) : null
        ) : gameState === "result" ? (
          <GLGameSingleResult
            user={user}
            recordToRender={result.recordToRender}
            onClickRetry={onClickRetry}
            registerRanking={registerRanking}
          />
        ) : null}
      </Suspense>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default GLGameSingle;
