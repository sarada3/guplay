import styled from "styled-components";
import { useGameContext } from "../../../utils/hooks/useContextCustom";
import { auth } from "../../../firebase";

import { heart } from "../../../components/reuse/Icons";

import { IGame } from "../../../types";

interface HeaderProps {
  game: IGame;
}

function Header(props: HeaderProps) {
  const { game } = props;
  const { resetGame } = useGameContext();
  const closeGameWindow = () => {
    if (window.confirm("Are you sure to exit game?")) {
      resetGame();
    }
  };
  const hamdleLike = () => {};
  return (
    <Container>
      <div>
        <Title>{game.title}</Title>
        <TextSmall>{game.category}</TextSmall>
      </div>
      <div>{game.description}</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <LikeButton onClick={hamdleLike}>{heart}</LikeButton>
        <div>{game.like.length}</div>
      </div>
      <button onClick={closeGameWindow}>close</button>
    </Container>
  );
}

const TextSmall = styled.div`
  font-size: 12px;
`;

const Container = styled.div`
  grid-area: header;
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fbf0b3;
`;

const Title = styled.div`
  font-weight: 600;
  color: brown;
`;

const LikeButton = styled.button`
  margin-right: 10px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  stroke: black;
  stroke-width: 4;
  fill: white;
`;

export default Header;
