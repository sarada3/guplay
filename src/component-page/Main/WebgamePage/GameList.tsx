import styled from "styled-components";

import { readRankings } from "../../../utils/db";
import { useGameContext } from "../../../utils/hooks/useContextCustom";

import GameListContainer from "../../../component-reuse/GameListContainer";
import GameListItem from "../../../component-reuse/GameListItem";

import { GameCategoryType, IGame } from "../../../types";

const titleText = {
  main: "Single playing game",
  sub: "You can play alone.",
};

interface GameListProps {
  categoryRoute: GameCategoryType;
}

function GameList(props: GameListProps) {
  const { categoryRoute } = props;
  const { gameList, dispatchGame } = useGameContext();

  const renderingGameList = gameList.filter(
    (game) => game.category === categoryRoute
  );
  if (categoryRoute === "multi") {
    titleText.main = "Multi playing game";
    titleText.sub = "You can play with your friends :D";
  }

  const onClickGameThumbnail = async (selectedGame: IGame) => {
    const rankingList = await readRankings(selectedGame.id);
    if (rankingList) {
      dispatchGame({ ...selectedGame, rankings: rankingList });
    }
  };

  return (
    <section>
      <MainTitle>{titleText.main}</MainTitle>
      <SubTitle>{titleText.sub}</SubTitle>
      <GameListContainer>
        {renderingGameList.map((game) => (
          <OuterLi key={game.code} onClick={() => onClickGameThumbnail(game)}>
            <GameListItem game={game} />
          </OuterLi>
        ))}
      </GameListContainer>
    </section>
  );
}

const OuterLi = styled.li`
  width: 400px;
  height: 340px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const MainTitle = styled.h1`
  font-size: 24px;
  color: black;
`;

const SubTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 12px;
`;

export default GameList;
