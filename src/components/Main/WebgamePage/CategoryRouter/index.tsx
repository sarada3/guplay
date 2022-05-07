import styled from "styled-components";

import CategoryLink from "./CategoryRouterLink";

import { puzzle, rocket } from "../../../reuse/Icons/index";

import { GameCategoryType } from "../../../../types";

interface CategoryRouterProps {
  categoryRoute: GameCategoryType;
  replaceCategoryRoute: (category: GameCategoryType) => void;
}

function CategoryRouter(props: CategoryRouterProps) {
  const { categoryRoute, replaceCategoryRoute } = props;
  return (
    <Container>
      <CategoryLink
        path="puzzle"
        categoryRoute={categoryRoute}
        icon={puzzle}
        replaceCategoryRoute={replaceCategoryRoute}
      />
      <CategoryLink
        path="arcade"
        categoryRoute={categoryRoute}
        icon={rocket}
        replaceCategoryRoute={replaceCategoryRoute}
      />
    </Container>
  );
}

const Container = styled.nav`
  margin-bottom: 50px;
  display: flex;
`;

export default CategoryRouter;
