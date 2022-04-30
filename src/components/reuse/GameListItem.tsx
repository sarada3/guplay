import styled from "styled-components";

import { IGame } from "../../types";

interface GameListItemProps {
  game: IGame;
}

function GameListItem(props: GameListItemProps) {
  const {
    game: { title, grade, category, thumbnail, author },
  } = props;
  return (
    <>
      <div style={{ height: "70%" }}>
        <GameThumbnail src={thumbnail} />
      </div>
      <Author>
        <AuthorThumbnail src={author.thumbnail} />
        <AuthorContents>
          <Title>{title}</Title>
          <div>{category}</div>
          <div>{grade}★</div>
        </AuthorContents>
      </Author>
    </>
  );
}

// const Container = styled.button`
//   width: 400px;
//   height: 340px;
//   padding: 10px;
//   cursor: pointer;
//   &:hover {
//     background-color: #eee;
//   }
// `;

const GameThumbnail = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Author = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
`;

const AuthorThumbnail = styled.img`
  margin-right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 15px;
`;

const AuthorContents = styled.div`
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
