import styled from "styled-components";

interface GameListContainerProps {
  children: React.ReactNode;
}

function GameListContainer(props: GameListContainerProps) {
  const { children } = props;
  return <Container>{children}</Container>;
}

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export default GameListContainer;
