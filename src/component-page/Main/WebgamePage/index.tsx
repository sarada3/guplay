import styled from "styled-components";
import { useState, useCallback } from "react";

import { useGameContext } from "../../../utils/hooks/useContextCustom";

import CategoryRouter from "./CategoryRouter";
import GameList from "../../../component-reuse/GameList";

import { GameCategoryType } from "../../../types";

function WebgamePage() {
  const { gameList, dispatchGame } = useGameContext();
  const [categoryRoute, setCategoryRoute] =
    useState<GameCategoryType>("single");
  const replaceCategoryRoute = useCallback((category: GameCategoryType) => {
    setCategoryRoute(category);
  }, []);
  const renderingGameList = gameList.filter(
    (game) => game.category === categoryRoute
  );
  const titleText = {
    main: "Single playing game",
    sub: "Multi playing game",
  };
  if (categoryRoute === "multi") {
    titleText.main = "Multi playing game";
    titleText.sub = "You can play with your friends :D";
  }
  return (
    <Container>
      <CategoryRouter
        categoryRoute={categoryRoute}
        replaceCategoryRoute={replaceCategoryRoute}
      />
      <GameList
        titleText={titleText}
        gameList={renderingGameList}
        dispatchGame={dispatchGame}
      />
    </Container>
  );
}

const Container = styled.div``;

export default WebgamePage;
