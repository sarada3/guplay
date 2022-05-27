import { useState, useEffect, useCallback, Suspense, lazy } from "react";

import { auth } from "./firebase";
import { useUserContext, useGameContext } from "./utils/hooks/useContextCustom";
import useLoadingAndError from "./utils/hooks/useLoadingAndError";
import { readUser, readGames } from "./utils/db";

import Header from "./component-page/Header";
import Main from "./component-page/Main";
import Footer from "./component-page/Footer";
import Loading from "./component-reuse/Loading";
import Error from "./component-reuse/Error";

import { PageRouteType } from "./types";

/**
 * 게임들은 각각 lazy import
 */
const Flipcard = lazy(() => import("./component-game/games/single/Flipcard"));

function App() {
  const { dispatchUser } = useUserContext();
  const { game, dispatchGameList } = useGameContext();
  const { loading, error, startLoading, endLoading, invokeError } =
    useLoadingAndError();
  const [pageRoute, setPageRoute] = useState<PageRouteType>("web");

  const replacePageRoute = useCallback((route: PageRouteType) => {
    setPageRoute(route);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const result = await readUser(user.uid);
        if (result) {
          dispatchUser(result);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatchUser]);
  useEffect(() => {
    const getGameList = async () => {
      startLoading();
      const gameList = await readGames();
      if (gameList) {
        dispatchGameList(gameList);
        endLoading();
      } else {
        invokeError();
      }
    };
    getGameList();
  }, [dispatchGameList, startLoading, endLoading, invokeError]);

  if (error) {
    return <Error />;
  }
  return (
    <>
      {loading && <Loading translucent={true} />}
      <Suspense fallback={<Loading translucent={true} />}>
        <Header pageRoute={pageRoute} replacePageRoute={replacePageRoute} />
        <Main pageRoute={pageRoute} replacePageRoute={replacePageRoute} />
        <Footer />
        {game.code === "flipcard" ? <Flipcard /> : null}
      </Suspense>
    </>
  );
}

export default App;
