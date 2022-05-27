import styled from "styled-components";
import { useState, useCallback } from "react";

import CategoryRouter from "./CategoryRouter";
import GameList from "./GameList";

import { GameCategoryType } from "../../../types";

function WebgamePage() {
  const [categoryRoute, setCategoryRoute] =
    useState<GameCategoryType>("single");

  const replaceCategoryRoute = useCallback((category: GameCategoryType) => {
    setCategoryRoute(category);
  }, []);

  return (
    <Container>
      <CategoryRouter
        categoryRoute={categoryRoute}
        replaceCategoryRoute={replaceCategoryRoute}
      />
      <GameList categoryRoute={categoryRoute} />
    </Container>
  );
}

const Container = styled.div``;

export default WebgamePage;
