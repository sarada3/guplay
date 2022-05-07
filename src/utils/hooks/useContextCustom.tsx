import { useContext } from "react";
import { GameContext } from "../../context/game";
import { UserContext } from "../../context/user";

export const useGameContext = () => {
  const { game, dispatchGame, resetGame } = useContext(GameContext);
  if (
    game === undefined ||
    dispatchGame === undefined ||
    resetGame === undefined
  ) {
    throw new Error("Thear is no Game context provider");
  } else {
    return { game, dispatchGame, resetGame };
  }
};

export const useUserContext = () => {
  const { user, dispatchUser } = useContext(UserContext);
  if (user === undefined || dispatchUser === undefined) {
    throw new Error("Thear is no User context Provider");
  } else {
    return { user, dispatchUser };
  }
};
