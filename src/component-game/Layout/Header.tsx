import styled from "styled-components";

import { updateGameLike } from "../../utils/db";
import { useUserContext } from "../../utils/hooks/useContextCustom";
import useLoginModalOpen from "../../utils/hooks/useLoginModalOpen";

import LoginModal from "../../component-reuse/LoginModal";
import { heart } from "../../assets/icons";

import { IGame } from "../../types";

interface HeaderProps {
  game: IGame;
  dispatchGameLike: (
    currentLike: boolean,
    userId: string,
    currentGameId: string
  ) => void;
  closeGameWindow: () => void;
}

function Header(props: HeaderProps) {
  const { game, dispatchGameLike, closeGameWindow } = props;
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
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <>
      {loginModalOpen && <LoginModal closeLoginModal={closeLoginModal} />}
      <Container>
        <div>
          <Title>{game.title}</Title>
          <TextSmall>{game.category}</TextSmall>
        </div>
        <div>{game.description}</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LikeButton onClick={onClickLike} isLike={isLike}>
            {heart}
          </LikeButton>
          <div>{game.likes.length}</div>
        </div>
        <button onClick={closeGameWindow}>close</button>
      </Container>
    </>
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

const LikeButton = styled.button<{ isLike: boolean }>`
  margin-right: 10px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  stroke: black;
  stroke-width: 4;
  fill: ${(props) => (props.isLike ? "red" : "white")};
`;

export default Header;
