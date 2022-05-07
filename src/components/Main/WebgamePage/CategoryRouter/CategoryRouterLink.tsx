import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import { GameCategoryType } from "../../../../types";

interface CategoryRouterLinkProps {
  path: GameCategoryType;
  categoryRoute: GameCategoryType;
  icon: React.ReactNode;
  replaceCategoryRoute: (category: GameCategoryType) => void;
}

function CategoryRouterLink(props: CategoryRouterLinkProps) {
  const { categoryRoute, path, icon, replaceCategoryRoute } = props;
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
      <Icon>{icon}</Icon>
      <Title>{path}</Title>
    </Container>
  );
}

const Container = styled.a<{
  colorProps: FlattenSimpleInterpolation;
}>`
  margin-right: 10px;
  padding: 5px 15px 5px 15px;
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 999px;
  ${(props) => props.colorProps}
  &:hover {
    background-color: #eee;
  }
`;

const Icon = styled.span`
  margin-right: 4px;
  width: 20px;
  height: 20px;
`;

const Title = styled.span``;

export default CategoryRouterLink;
