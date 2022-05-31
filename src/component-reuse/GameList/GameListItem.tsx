import styled from "styled-components";

import useStorage from "../../utils/hooks/useStorage";

import { FlexCenter } from "../StyledComponent";
import { heart } from "../../assets/icons";

import { IGame } from "../../types";

interface GameListItemProps {
  game: IGame;
}

function GameListItem(props: GameListItemProps) {
  const {
    game: { title, category, thumbnail, likes, creator },
  } = props;
  const gameThumbnailSrc = useStorage(thumbnail);
  const creatorThumbnailSrc = useStorage(creator.thumbnail);
  return (
    <Container>
      <Top>
        {gameThumbnailSrc !== "" && <ThumbnailImg src={gameThumbnailSrc} />}
      </Top>
      <Bottom>
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
          </CreatorContents>
        </Creator>
        <FlexCenter>
          <HeartIcon>{heart}</HeartIcon>
          <span>{likes.length}</span>
        </FlexCenter>
      </Bottom>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Top = styled(FlexCenter)`
  height: 70%;
`;

const Bottom = styled.div`
  height: 30%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ThumbnailImg = styled.img`
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

const HeartIcon = styled.div`
  margin-right: 10px;
  width: 20px;
  height: 20px;
`;

export default GameListItem;
