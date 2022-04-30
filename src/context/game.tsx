import { useState, createContext, Dispatch } from "react";

import { GamecodeType } from "../types";

interface IGameContext {
  game: GamecodeType;
  dispatchGame?: Dispatch<React.SetStateAction<GamecodeType>>;
}

const initialGameState: IGameContext = {
  game: "",
};

export const GameContext = createContext<IGameContext>(initialGameState);

// provider
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<GamecodeType>(initialGameState.game);

  return (
    <GameContext.Provider value={{ game, dispatchGame: setGame }}>
      {children}
    </GameContext.Provider>
  );
};
