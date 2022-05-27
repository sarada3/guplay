import { useState, useCallback, createContext } from "react";

import { IGame, IRanking } from "../types";

interface IGameContext {
  game: IGame;
  gameList: Array<IGame>;
  dispatchGameList?: (gameList: Array<IGame>) => void;
  dispatchGame?: (game: IGame) => void;
  dispatchGameLike?: (
    currentLike: boolean,
    userId: string,
    currentGameId: string
  ) => void;
  dispatchGameRanking?: (newRanking: IRanking) => void;
  dispatchResetGame?: () => void;
}

const initialGameState: { game: IGame; gameList: Array<IGame> } = {
  game: {
    id: "",
    code: "",
    category: "",
    title: "",
    thumbnail: "",
    description: "",
    trailer: "",
    creator: {
      name: "",
      thumbnail: "",
    },
    difficulties: [],
    likes: [],
    rankings: [],
  },
  gameList: [],
};

export const GameContext = createContext<IGameContext>(initialGameState);

// provider
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<IGame>(initialGameState.game);
  const [gameList, setGameList] = useState<Array<IGame>>(
    initialGameState.gameList
  );
  const dispatchGameList = useCallback((gameList: Array<IGame>) => {
    setGameList([...gameList]);
  }, []);
  const dispatchGame = useCallback((game: IGame | null) => {
    if (game) {
      setGame({ ...game });
    } else {
      setGame({ ...initialGameState.game });
    }
  }, []);
  /**
   * 어차피 rendering할때 계산하는김에 currentLike를 컴포넌트에서 받자.
   */
  const dispatchGameLike = useCallback(
    (currentLike: boolean, userId: string, currentGameId: string) => {
      setGame((prev) => ({
        ...prev,
        likes: currentLike
          ? prev.likes.filter((likingUserId) => likingUserId !== userId)
          : [...prev.likes, userId],
      }));
      setGameList((prev) =>
        prev.map((game) => {
          if (game.id === currentGameId) {
            return {
              ...game,
              likes: currentLike
                ? game.likes.filter((likingUserId) => likingUserId !== userId)
                : [...game.likes, userId],
            };
          } else {
            return game;
          }
        })
      );
    },
    []
  );
  const dispatchGameRanking = useCallback(
    (newRanking: IRanking) => {
      // map으로하면 전부 순회하기 때문에 for문으로 돌려서 break하거나 index만 뽑아서 수정.
      // 근데 setState 안에서 for문 돌리면 이상하잖아. prev로 접근안하고 밖에서 state에 접근해도 문제없는걸로 아는데.. => [todo]react 뿌시기 하면서 확인해볼것

      const targetRankingIndex = game.rankings.findIndex(
        (r) =>
          r.userId === newRanking.userId &&
          r.difficulty === newRanking.difficulty
      );
      // [todo] firestore에서 가져올때 orderBy로 정렬+랭킹변경시 여기서 순서에 맞게 정렬이 되면 Ranking에서 렌더링할때마다 sort안해줘도 됨.
      // [tip] setState 안에서 conditional은 최대한 빼기
      if (targetRankingIndex === -1) {
        // add
        setGame((prev) => ({
          ...prev,
          rankings: [...prev.rankings, newRanking],
        }));
      } else {
        // modify
        setGame((prev) => ({
          ...prev,
          rankings: [
            ...prev.rankings.slice(0, targetRankingIndex),
            newRanking,
            ...prev.rankings.slice(targetRankingIndex + 1),
          ],
        }));
      }
    },
    [game.rankings]
  );
  const dispatchResetGame = useCallback(() => {
    setGame({ ...initialGameState.game });
  }, []);
  return (
    <GameContext.Provider
      value={{
        game,
        gameList,
        dispatchGameList,
        dispatchGame,
        dispatchGameLike,
        dispatchGameRanking,
        dispatchResetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
