import { useState, createContext } from "react";

import { IGame } from "../types";

interface IGameContext {
  game: IGame;
  dispatchGame?: (game: IGame) => void;
  resetGame?: () => void;
}

const initialGameState: { game: IGame } = {
  game: {
    id: "",
    code: "",
    category: "",
    title: "",
    description: "",
    like: [],
    thumbnail: "",
    creator: {
      name: "",
      thumbnail: "",
    },
  },
};

export const GameContext = createContext<IGameContext>(initialGameState);

// provider
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<IGame>(initialGameState.game);
  const dispatchGame = (game: IGame) => {
    setGame({ ...game });
  };
  const resetGame = () => {
    setGame({ ...initialGameState.game });
  };
  return (
    <GameContext.Provider value={{ game, dispatchGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};
