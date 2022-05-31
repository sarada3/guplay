import styled, { css, FlattenSimpleInterpolation } from "styled-components";

import { GameCategoryType } from "../../../../types";

interface CategoryLinkProps {
  path: GameCategoryType;
  categoryRoute: GameCategoryType;
  replaceCategoryRoute: (category: GameCategoryType) => void;
}

function CategoryLink(props: CategoryLinkProps) {
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
      <LinkText>{path.charAt(0).toUpperCase() + path.slice(1)} play</LinkText>
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

const LinkText = styled.span`
  padding: 4px 6px 4px 6px;
  font-weight: 600;
`;

export default CategoryLink;
