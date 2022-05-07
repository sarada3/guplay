import styled from "styled-components";
import { useEffect, useState } from "react";

import { getGames } from "../../../../utils/db";

import GameListContainer from "../../../reuse/GameListContainer";
import GameListItem from "../../../reuse/GameListItem";
import Loading from "../../../reuse/Loading";
import { HoverButton } from "../../../reuse/StyledComponent";

import { IGame } from "../../../../types";

interface PuzzleProps {
  onClickDispatchGame: (gameObj: IGame) => void;
}

function Puzzle(props: PuzzleProps) {
  const { onClickDispatchGame } = props;
  const [games, setGames] = useState<Array<IGame>>([]);
  const [render, setRender] = useState("init"); // init, loading, error, done
  useEffect(() => {
    const getData = async () => {
      const result: Array<IGame> | null = await getGames("puzzle");
      if (result) {
        setGames(result);
        setRender("done");
      } else {
        setRender("error");
      }
    };
    getData();
  }, []);
  if (render === "init") {
    return null;
  }
  return (
    <Container>
      <section>
        <SectionTitle>퍼즐게임 웹버전</SectionTitle>
        <SectionSubTitle>퍼즐게임을 플레이 해보세요.</SectionSubTitle>
        <GameListContainer>
          {games.map((game) => (
            <Button key={game.code} onClick={() => onClickDispatchGame(game)}>
              <GameListItem game={game} />
            </Button>
          ))}
        </GameListContainer>
      </section>
    </Container>
  );
}

const Container = styled.div``;

const Button = styled.div`
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
