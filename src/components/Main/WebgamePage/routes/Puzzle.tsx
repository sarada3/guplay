import styled from "styled-components";

import GameListContainer from "../../../reuse/GameListContainer";
import GameListItem from "../../../reuse/GameListItem";

import { games } from "../../../../datas";

import { GamecodeType } from "../../../../types";

interface PuzzleProps {
  handleGameChange: (gameStr: GamecodeType) => void;
}

function Puzzle(props: PuzzleProps) {
  const { handleGameChange } = props;
  return (
    <Container>
      <section>
        <SectionTitle>퍼즐게임 웹버전</SectionTitle>
        <SectionSubTitle>퍼즐게임을 플레이 해보세요.</SectionSubTitle>
        <GameListContainer>
          {games.puzzle.map((game) => (
            <Button key={game.code} onClick={() => handleGameChange(game.code)}>
              <GameListItem game={game} />
            </Button>
          ))}
        </GameListContainer>
      </section>
    </Container>
  );
}

const Container = styled.div``;

const Button = styled.button`
  width: 400px;
  height: 340px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const SectionTitle = styled.h1`
  font-size: 24px;
  color: black;
`;

const SectionSubTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 12px;
`;

export default Puzzle;
