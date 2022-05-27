import styled from "styled-components";
import { useEffect, useState, useRef, useCallback } from "react";

import { createOrdispatchGameRanking } from "../../../../utils/db";
import {
  useGameContext,
  useUserContext,
} from "../../../../utils/hooks/useContextCustom";
import useLoadingAndError from "../../../../utils/hooks/useLoadingAndError";

import FlipcardSetting from "./FlipcardSetting";
import FlipcardPlaying from "./FlipcardPlaying";
import FlipcardResult from "./FlipcardResult";
import Loading from "../../../../component-reuse/Loading";
import Error from "../../../../component-reuse/Error";
import { GameWindow, Header, Lobby, Ranking, Intro } from "../../../Layout";

import { GameStateType } from "../../../../types";

export type NumOfCardPerLineType = 3 | 5 | 7;

export type Card = {
  no: number;
  path: string;
  state:
    | "none"
    | "open"
    | "close"
    | "unmatch_temp_close"
    | "unmatch_target_close"
    | "re_unmatch_target_close";
  url: string;
  translate: {
    x: number;
    y: number;
  };
};

/**
 * Flipcard 루트.
 * 게임 세팅에 필요한 정보(한줄에 카드 몇개?, 화면에 따른 게임판 크기)만 담당하고
 * 게임관련 세부사항은 FlipcardPlaying에서 처리.
 */
function Flipcard() {
  const { user } = useUserContext();
  const { game, dispatchGameLike, dispatchGameRanking, dispatchResetGame } =
    useGameContext();
  const [gameState, setGameState] = useState<GameStateType>("intro");
  const [numOfCardPerLine, setNumOfCardPerLine] = useState(
    Number(game.difficulties[0].charAt(0))
  );
  const [startTime, setStartTime] = useState(-1);
  const [boardWidth, setBoardWidth] = useState(0);
  const [result, setResult] = useState({ record: -1, recordToRender: "" });
  const { loading, error, startLoading, endLoading, invokeError } =
    useLoadingAndError();
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const saveStarttime = useCallback(() => {
    const now = Date.now();
    setStartTime(now);
  }, []);
  const onChangeNumOfCardPerLine = useCallback(
    (value: NumOfCardPerLineType) => {
      setNumOfCardPerLine(value);
    },
    []
  );
  const onClickRetry = () => {
    setGameState("intro");
  };
  const enterToPlaying = () => {
    if (boardWidth !== 0) {
      setGameState("playing");
    }
  };
  const closeGameWindow = () => {
    if (window.confirm("Are you sure to exit game?")) {
      dispatchResetGame();
    }
  };
  const handleGameEnd = useCallback(() => {
    if (startTime !== -1) {
      const timeElapsed = Date.now() - startTime;
      const minute = Math.floor(timeElapsed / (1000 * 60));
      const second = ((timeElapsed % (1000 * 60)) / 1000).toFixed(2);
      const recordToRender =
        minute > 0 ? `${minute}m ${second}s` : `${second}s`;
      setResult({ record: timeElapsed, recordToRender });
      setGameState("end");
    } else {
      console.error("startTime is -1. Something goes wrong");
    }
  }, [startTime]);
  const registerRanking = useCallback(async () => {
    if (user) {
      startLoading();
      const response = await createOrdispatchGameRanking(
        user,
        game.id,
        `${numOfCardPerLine}x${numOfCardPerLine}`,
        result.record,
        result.recordToRender
      );
      if (response) {
        if (response.status === "noupdate") {
          alert("You already have a higher record");
        } else if (response.ranking) {
          if (response.status === "new") {
            alert("The record has been published.");
          } else if (response.status === "update") {
            alert("You set a new record!, your record has been updated.");
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
    numOfCardPerLine,
    result,
    dispatchGameRanking,
    startLoading,
    endLoading,
    invokeError,
  ]);

  useEffect(() => {
    // 뷰포트 크기에 맞는 게임보드 사이즈(정사각) 확정
    // FlipcardPlaying에서 게임에 필요한 값들 한번에 결정하는것도 좋겠지만
    // 여기서 사용자가 Intro를 보고있는 동안 계산하는것도 좋은 방법인듯...
    // 여기서 board 사이즈만 결정하고 FlipcardPlaying에서 카드사이즈, translate값들 결정할것,,
    const decideBoardWidth = async () => {
      if (gameContainerRef.current) {
        const gameContainerWidth = gameContainerRef.current.clientWidth;
        const gameContainerHeight = gameContainerRef.current.clientHeight;
        const currentBoardLength =
          Math.min(gameContainerWidth, gameContainerHeight) * 0.9;
        setBoardWidth(currentBoardLength);
      }
    };
    decideBoardWidth();
  }, []);

  if (error) {
    return <Error />;
  }
  return (
    <>
      {loading && <Loading translucent={true} />}
      <GameWindow>
        <Header
          game={game}
          dispatchGameLike={dispatchGameLike}
          closeGameWindow={closeGameWindow}
        />
        <Lobby />
        <GameContainer ref={gameContainerRef}>
          {gameState === "intro" ? (
            <Intro
              title={game.title}
              creator={game.creator}
              enterToPlaying={enterToPlaying}
            >
              <FlipcardSetting
                numOfCardPerLine={numOfCardPerLine}
                onChangeNumOfCardPerLine={onChangeNumOfCardPerLine}
              />
            </Intro>
          ) : gameState === "playing" ? (
            <FlipcardPlaying
              saveStarttime={saveStarttime}
              boardWidth={boardWidth}
              numOfCardPerLine={numOfCardPerLine}
              handleGameEnd={handleGameEnd}
              startLoading={startLoading}
              endLoading={endLoading}
              invokeError={invokeError}
            />
          ) : gameState === "end" ? (
            <FlipcardResult
              user={user}
              recordToRender={result.recordToRender}
              onClickRetry={onClickRetry}
              registerRanking={registerRanking}
            />
          ) : null}
        </GameContainer>
        <Ranking rankingList={game.rankings} difficulties={game.difficulties} />
      </GameWindow>
    </>
  );
}

const GameContainer = styled.div`
  grid-area: game;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) 0 0/300%
    300%;
`;

export default Flipcard;