import styled from "styled-components";

import CategoryLink from "./CategoryRouterLink";

import { puzzle, rocket } from "../../../Etc/Icons/material";

import { CategoryRouteType } from "../../../../types";

interface CategoryRouterProps {
  categoryRoute: CategoryRouteType;
  handleCategoryChange: (category: CategoryRouteType) => void;
}

function CategoryRouter(props: CategoryRouterProps) {
  const { categoryRoute, handleCategoryChange } = props;
  return (
    <Container>
      <CategoryLink
        path="puzzle"
        categoryRoute={categoryRoute}
        icon={puzzle}
        handleCategoryChange={handleCategoryChange}
      />
      <CategoryLink
        path="arcade"
        categoryRoute={categoryRoute}
        icon={rocket}
        handleCategoryChange={handleCategoryChange}
      />
    </Container>
  );
}

const Container = styled.nav`
  padding: 25px 0 50px 0;
  display: flex;
`;

export default CategoryRouter;
