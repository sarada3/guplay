import styled from "styled-components";
import { useState, useCallback, Suspense, lazy } from "react";

import { useGameContext } from "../../../utils/hooks/useContextCustom";

import CategoryRouter from "./CategoryRouter";
import Puzzle from "./routes/Puzzle";
import Arcade from "./routes/Arcade";

import { GameCategoryType, GamecodeType, IGame } from "../../../types";

const Flipcard = lazy(() => import("../../../games/puzzle/Flipcard"));

function WebgamePage() {
  const [categoryRoute, setCategoryRoute] =
    useState<GameCategoryType>("puzzle");
  const { game, dispatchGame } = useGameContext();
  const replaceCategoryRoute = useCallback((category: GameCategoryType) => {
    setCategoryRoute(category);
  }, []);
  const onClickDispatchGame = useCallback(
    (gameObj: IGame) => {
      dispatchGame(gameObj);
    },
    [dispatchGame]
  );
  return (
    <>
      <Container>
        <CategoryRouter
          categoryRoute={categoryRoute}
          replaceCategoryRoute={replaceCategoryRoute}
        />
        {categoryRoute === "puzzle" ? (
          <Puzzle onClickDispatchGame={onClickDispatchGame} />
        ) : categoryRoute === "arcade" ? (
          <Arcade />
        ) : null}
      </Container>
      <Suspense>{game.code === "flipcard" ? <Flipcard /> : null}</Suspense>
    </>
  );
}

const Container = styled.div`
  /* padding: 0 120px 0 120px;
  @media ${(props) => props.theme.device.UPTO_LAPTOP} {
    padding: 0 80px 0 80px;
  }
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    padding: 0 30px 0 30px;
  }
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    padding: 0 10px 0 10px;
  } */
`;

export default WebgamePage;
