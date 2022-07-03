import CategoryLink from "./CategoryLink";

import styled from "styled-components";

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
        path="single"
        categoryRoute={categoryRoute}
        replaceCategoryRoute={replaceCategoryRoute}
      />
      <CategoryLink
        path="multi"
        categoryRoute={categoryRoute}
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
