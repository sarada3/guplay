import styled from "styled-components";
import { useEffect } from "react";
import { useState, useCallback, Suspense, lazy } from "react";

import { useUserContext } from "./utils/hooks/useContextCustom";
import { auth } from "./firebase";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/reuse/Loading";

import { PageRouteType } from "./types";

const WebgamePage = lazy(() => import("./components/Main/WebgamePage"));
const MobilegamePage = lazy(() => import("./components/Main/MobilegamePage"));
const MyPage = lazy(() => import("./components/Main/MyPage"));

function App() {
  const { dispatchUser } = useUserContext();
  const [pageRoute, setPageRoute] = useState<PageRouteType>("web");
  const replacePageRoute = useCallback((route: PageRouteType) => {
    setPageRoute(route);
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.displayName && user.email && user.photoURL) {
        dispatchUser({
          id: user.uid,
          name: user.displayName,
          email: user.email,
          thumbnail: user.photoURL,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatchUser]);
  return (
    <Suspense fallback={<Loading />}>
      <Header pageRoute={pageRoute} replacePageRoute={replacePageRoute} />
      <Main>
        {pageRoute === "web" ? (
          <WebgamePage />
        ) : pageRoute === "mobile" ? (
          <MobilegamePage />
        ) : pageRoute === "mypage" ? (
          <MyPage />
        ) : null}
      </Main>
      <Footer />
    </Suspense>
  );
}

const Main = styled.main`
  margin: auto;
  margin-top: ${(props) => props.theme.length.HEIGHT_HEADER}px;
  padding: 50px 120px 0 120px;
  max-width: 2500px;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-top: ${(props) => props.theme.length.HEIGHT_HEADER_MOBILE}px;
  }
  @media ${(props) => props.theme.device.UPTO_LAPTOP} {
    padding: 0 80px 0 80px;
  }
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    padding: 0 30px 0 30px;
  }
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    padding: 0 10px 0 10px;
  }
`;

export default App;
