import styled from "styled-components";
import React from "react";

import { updateGameLike } from "../../utils/db";
import { useUserContext } from "../../utils/hooks/useContextCustom";
import useLoginModalOpen from "../../utils/hooks/useLoginModalOpen";

import LoginModal from "../../component-reuse/LoginModal";
import { TextSmall } from "../../component-reuse/StyledComponent";
import { heart, xmark } from "../../assets/icons";

import { IGame } from "../../types";

interface GameLayoutHeaderProps {
  game: IGame;
  dispatchGameLike: (
    currentLike: boolean,
    userId: string,
    currentGameId: string
  ) => void;
  onClickRouterLink: (route: string) => void;
  closeGameWindow: () => void;
  invokeError: () => void;
}

function GameLayoutHeader(props: GameLayoutHeaderProps) {
  const {
    game,
    dispatchGameLike,
    onClickRouterLink,
    closeGameWindow,
    invokeError,
  } = props;
  const { user } = useUserContext();
  const { loginModalOpen, openLoginModal, closeLoginModal } =
    useLoginModalOpen();
  /**
   * isLike는 game, user state(context)에 따라 변화하므로
   * 굳이 isLike state을 선언할 필요 없음.
   * isLike를 연산하는 데에 side effect가 발생하지도 않으므로 useEffect 필요없음.
   */
  let isLike = false;
  if (user) {
    if (game.likes.findIndex((userId) => userId === user.id) !== -1) {
      isLike = true;
    }
  }

  const onClickLike = async () => {
    if (user) {
      const response = await updateGameLike(game.id, user.id, isLike);
      if (response.ok) {
        dispatchGameLike(isLike, user.id, game.id);
      } else {
        invokeError();
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <>
      {loginModalOpen && <LoginModal closeLoginModal={closeLoginModal} />}
      <Container>
        <Contents>
          <div>
            <Title>{game.title}</Title>
            <TextSmall>{game.category}</TextSmall>
          </div>
          <div>{game.description}</div>
          <Like>
            <LikeButton onClick={onClickLike} isLike={isLike}>
              {heart}
            </LikeButton>
            <div>{game.likes.length}</div>
          </Like>
          <CloseButton onClick={closeGameWindow}>{xmark}</CloseButton>
        </Contents>
        <MobileRouter>
          {game.category === "multi" && (
            <button
              style={{ left: 0 }}
              onClick={() => onClickRouterLink("lobby")}
            >
              Lobby{">>"}
            </button>
          )}
          <button
            style={{ position: "absolute", right: 0 }}
            onClick={() => onClickRouterLink("ranking")}
          >
            {"<<"}Ranking
          </button>
        </MobileRouter>
      </Container>
    </>
  );
}

const Container = styled.header`
  grid-area: header;
  background: #fbf0b3;
`;

const Contents = styled.div`
  padding: 0 20px 0 20px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    height: 70%;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  color: brown;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
`;

const LikeButton = styled.button<{ isLike: boolean }>`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  stroke: black;
  stroke-width: 4;
  fill: ${(props) => (props.isLike ? "red" : "white")};
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
`;

const MobileRouter = styled.div`
  display: none;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    display: block;
    position: relative;
    height: 30%;
  }
`;

export default React.memo(GameLayoutHeader);
