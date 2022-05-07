import styled from "styled-components";
import { useState } from "react";

import useStorage from "../../utils/hooks/useStorage";

import { IGame } from "../../types";

interface GameListItemProps {
  game: IGame;
}

function GameListItem(props: GameListItemProps) {
  const {
    game: { title, like, category, thumbnail, creator },
  } = props;
  const gameThumbnailSrc = useStorage(thumbnail);
  const creatorThumbnailSrc = useStorage(creator.thumbnail);
  return (
    <>
      <div style={{ height: "70%" }}>
        {gameThumbnailSrc !== "" && <GameThumbnail src={gameThumbnailSrc} />}
      </div>
      <Creator>
        <CreatorThumbnailContainer>
          {creatorThumbnailSrc !== "" && (
            <img
              width="100%"
              height="100%"
              src={creatorThumbnailSrc}
              alt={creator.name}
            />
          )}
        </CreatorThumbnailContainer>
        <CreatorContents>
          <Title>{title}</Title>
          <div>{category}</div>
          <div>{like.length}</div>
        </CreatorContents>
      </Creator>
    </>
  );
}

const GameThumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Creator = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
`;

const CreatorThumbnailContainer = styled.div`
  margin-right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 15px;
  overflow: hidden;
`;

const CreatorContents = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 18px;
`;

export default GameListItem;
