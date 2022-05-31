import styled from "styled-components";

import { readRankings } from "../../utils/db";

import GameListItem from "./GameListItem";

import { IGame } from "../../types";

interface GameListProps {
  titleText: { main: string; sub: string };
  gameList: Array<IGame>;
  dispatchGame: (game: IGame) => void;
}

function GameList(props: GameListProps) {
  const { titleText, gameList, dispatchGame } = props;

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
      <ListContainer>
        {gameList.map((game) => (
          <OuterLi key={game.code} onClick={() => onClickGameThumbnail(game)}>
            <GameListItem game={game} />
          </OuterLi>
        ))}
      </ListContainer>
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
`;

const SubTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 12px;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

export default GameList;
