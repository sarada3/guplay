import styled from "styled-components";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";

import { createOrModifyGameRanking } from "../../utils/db";

import GameIntro from "./gamestate/GameIntro";
import GameResult from "./gamestate/GameResult";

import { GameStateType, IGame, IRanking, IUser } from "../../types";
import Onetofifty from "../games/single/Onetofifty";

const Flipcard = lazy(() => import("../games/single/Flipcard"));

interface GameLayoutGameProps {
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
function GameLayoutGame(props: GameLayoutGameProps) {
  const {
    user,
    game,
    dispatchGameRanking,
    startLoading,
    endLoading,
    invokeError,
  } = props;
  const [gameState, setGameState] = useState<GameStateType>("intro");
  const [boardWidth, setBoardWidth] = useState(0);
  const [startTime, setStartTime] = useState(-1);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    game.difficulties[0]
  );
  const [result, setResult] = useState({ record: -1, recordToRender: "" });
  const gameContainerRef = useRef<HTMLDivElement>(null);

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
    }
  }, [startTime]);
  const registerRanking = useCallback(async () => {
    if (user) {
      startLoading();
      const response = await createOrModifyGameRanking(
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
  useEffect(() => {
    // 뷰포트 크기에 맞는 게임보드 사이즈(정사각) 결정
    const decideBoardWidth = async () => {
      if (gameContainerRef.current) {
        const gameContainerWidth = gameContainerRef.current.clientWidth;
        const gameContainerHeight = gameContainerRef.current.clientHeight;
        const currentBoardLength = Math.min(
          gameContainerWidth,
          gameContainerHeight * 0.9
        );
        setBoardWidth(currentBoardLength);
      }
    };
    decideBoardWidth();
  }, []);
  return (
    <Container ref={gameContainerRef}>
      <Suspense>
        {gameState === "intro" ? (
          <GameIntro
            selectedDifficulty={selectedDifficulty}
            difficulties={game.difficulties}
            title={game.title}
            creator={game.creator}
            enterToPlaying={enterToPlaying}
            onChangeDifficulty={onChangeDifficulty}
          />
        ) : gameState === "playing" ? (
          <>
            {game.code === "flipcard" ? (
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
                numOfBlockPerLine={Number(selectedDifficulty.charAt(0))}
                saveStarttime={saveStarttime}
                handleGameEnd={handleGameEnd}
              />
            ) : null}
          </>
        ) : gameState === "result" ? (
          <GameResult
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
  grid-area: game;
  z-index: 0;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) 0 0/300%
    300%;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    grid-area: lobby_game_ranking;
    position: absolute;
    inset: 0;
  }
`;

export default React.memo(
  GameLayoutGame,
  (prev, next) => prev.game.id === next.game.id && prev.user === next.user
);
