import MyPageSetting from "./MyPageSettings";
import GameList from "../../../component-reuse/GameList";

import styled from "styled-components";
import { useEffect } from "react";

import { auth } from "../../../firebase";
import { useUserContext } from "../../../utils/hooks/useContextCustom";
import { useGameContext } from "../../../utils/hooks/useContextCustom";

import { PageRouteType } from "../../../types";

interface MyPageProps {
  replacePageRoute: (route: PageRouteType) => void;
}

function MyPage(props: MyPageProps) {
  const { replacePageRoute } = props;
  const { user, dispatchUser } = useUserContext();
  const { gameList } = useGameContext();
  const renderingGameList = user
    ? gameList.filter((game) => game.likes.includes(user.id))
    : [];
  const titleText = {
    main: "Games you like",
    sub: "Eiusmod in pariatur nostrud deserunt tempor ullamco ex mollit aliqua fugiat laborum ex.!",
  };
  useEffect(() => {
    if (!user || !auth.currentUser) {
      replacePageRoute("web");
    }
  }, [user, replacePageRoute]);

  if (!user) {
    return null;
  }
  return (
    <Container>
      <MyPageSetting user={user} dispatchUser={dispatchUser} />
      {/* 내 랭킹 */}
      {/* like list */}
      {renderingGameList.length > 0 && (
        <GameList titleText={titleText} gameList={renderingGameList} />
      )}
    </Container>
  );
}

const Container = styled.div``;

export default MyPage;
