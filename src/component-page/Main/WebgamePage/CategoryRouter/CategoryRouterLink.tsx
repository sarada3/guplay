import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import { GameCategoryType } from "../../../../types";

interface CategoryRouterLinkProps {
  path: GameCategoryType;
  categoryRoute: GameCategoryType;
  replaceCategoryRoute: (category: GameCategoryType) => void;
}

function CategoryRouterLink(props: CategoryRouterLinkProps) {
  const { categoryRoute, path, replaceCategoryRoute } = props;

  const colorProps =
    categoryRoute === path
      ? css`
          border-color: #e6f3ef;
          color: #056449;
          background-color: #e6f3ef;
        `
      : css`
          border-color: lightgrey;
          color: inherit;
          background-color: transparent;
        `;

  return (
    <Container
      onClick={() => replaceCategoryRoute(path)}
      colorProps={colorProps}
    >
      <Title>{path.charAt(0).toUpperCase() + path.slice(1)} play</Title>
    </Container>
  );
}

const Container = styled.a<{ colorProps: FlattenSimpleInterpolation }>`
  margin-right: 10px;
  padding: 5px 15px 5px 15px;
  border: 1px solid lightgray;
  border-radius: 999px;
  &:hover {
    background-color: #eee;
  }
  ${(props) => props.colorProps};
`;

const Title = styled.div`
  padding: 4px 6px 4px 6px;
  font-weight: 600;
`;

export default CategoryRouterLink;
