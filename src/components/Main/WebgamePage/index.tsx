import styled from "styled-components";
import { useState, useCallback, Suspense, lazy } from "react";

import { useGameContext } from "../../../utils/hooks/useContextCustom";

import CategoryRouter from "./CategoryRouter";
import Puzzle from "./routes/Puzzle";
import Arcade from "./routes/Arcade";

import { CategoryRouteType, GamecodeType } from "../../../types";

const FlipCard = lazy(() => import("../../../games/puzzle/FlipCard"));
const OneToFifty = lazy(() => import("../../../games/puzzle/OneToFifty"));

function WebgamePage() {
  const [categoryRoute, setCategoryRoute] =
    useState<CategoryRouteType>("puzzle");
  const { game, dispatchGame } = useGameContext();
  const handleCategoryChange = useCallback((category: CategoryRouteType) => {
    setCategoryRoute(category);
  }, []);
  const handleGameChange = useCallback(
    (gameStr: GamecodeType) => {
      dispatchGame(gameStr);
    },
    [dispatchGame]
  );
  return (
    <>
      <Container>
        <CategoryRouter
          categoryRoute={categoryRoute}
          handleCategoryChange={handleCategoryChange}
        />
        {categoryRoute === "puzzle" ? (
          <Puzzle handleGameChange={handleGameChange} />
        ) : categoryRoute === "arcade" ? (
          <Arcade />
        ) : null}
      </Container>
      <Suspense>
        {game === "FLIPCARD" ? (
          <FlipCard />
        ) : game === "ONETOFIFTY" ? (
          <OneToFifty />
        ) : null}
      </Suspense>
    </>
  );
}

const Container = styled.div`
  padding: 0 120px 0 120px;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    padding: 0 10px 0 10px;
  }
`;

export default WebgamePage;
