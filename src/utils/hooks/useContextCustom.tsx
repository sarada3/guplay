/**
 * Hooks for easy using.
 * react context와 typescript를 함께 사용하기 위한 hook.
 * context가 초기화 되어 각 state들이 초기값을 가지기 전까지는 접근하 수 없음.
 * (상위에서 초기화되므로 앱 사용중에 undefined를 얻을 일은 없지만 typescript는 걱정되는 듯.)
 */
import { useContext } from "react";
import { GameContext } from "../../context/game";
import { UserContext } from "../../context/user";

export const useGameContext = () => {
  const {
    game,
    gameList,
    dispatchGameList,
    dispatchGame,
    dispatchGameLike,
    dispatchGameRanking,
    dispatchResetGame,
  } = useContext(GameContext);
  if (
    game === undefined ||
    gameList === undefined ||
    dispatchGameList === undefined ||
    dispatchGame === undefined ||
    dispatchGameLike === undefined ||
    dispatchGameRanking === undefined ||
    dispatchResetGame === undefined
  ) {
    throw new Error("Thear is no Game context provider");
  } else {
    return {
      game,
      gameList,
      dispatchGameList,
      dispatchGame,
      dispatchGameLike,
      dispatchGameRanking,
      dispatchResetGame,
    };
  }
};

export const useUserContext = () => {
  const { user, dispatchUser, resetUser } = useContext(UserContext);
  if (
    user === undefined ||
    dispatchUser === undefined ||
    resetUser === undefined
  ) {
    throw new Error("Thear is no User context Provider");
  } else {
    return { user, dispatchUser, resetUser };
  }
};
