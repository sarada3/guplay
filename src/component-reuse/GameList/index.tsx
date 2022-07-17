import GameListItem from "./GameListItem";

import styled from "styled-components";

import { readRankings } from "../../utils/db";
import { useGameContext } from "../../utils/hooks/useContextCustom";

import { IGame } from "../../types";

interface GameListProps {
  titleText: { main: string; sub: string };
  gameList: Array<IGame>;
}

function GameList(props: GameListProps) {
  const { titleText, gameList } = props;
  const { dispatchGame } = useGameContext();
  const onClickGameThumbnail = async (selectedGame: IGame) => {
    const rankingList = await readRankings(selectedGame);
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
          <GameListItem
            key={game.code}
            game={game}
            onClickGameThumbnail={onClickGameThumbnail}
          />
        ))}
      </ListContainer>
    </section>
  );
}

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
