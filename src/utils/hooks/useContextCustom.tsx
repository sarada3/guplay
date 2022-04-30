import { useContext } from "react";
import { GameContext } from "../../context/game";
import { UserContext } from "../../context/user";

// export const useMainContextState = () => {
//   const state = useContext(MainContext);
//   return state;
// };

// export const useMainContextDispatch = () => {
//   const dispatch = useContext(MainDitpatchContext);
//   if (!dispatch) throw new Error("No Provider detected");
//   return dispatch;
// };

export const useGameContext = () => {
  const { game, dispatchGame } = useContext(GameContext);
  if (game === undefined || dispatchGame === undefined) {
    throw new Error("Thear is no Game Provider");
  } else {
    return { game, dispatchGame };
  }
};

export const useUserContext = () => {
  const { user, dispatchUser } = useContext(UserContext);
  if (user === undefined || dispatchUser === undefined) {
    throw new Error("Thear is no Game Provider");
  } else {
    return { user, dispatchUser };
  }
};
