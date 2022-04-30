import styled from "styled-components";
import { useState, useCallback, Suspense, lazy } from "react";
import { useGameContext } from "./utils/hooks/useContextCustom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Etc/Loading";

import { PageRouteType } from "./types";

const WebgamePage = lazy(() => import("./components/Main/WebgamePage"));
const MobilegamePage = lazy(() => import("./components/Main/MobilegamePage"));

function App() {
  const [pageRoute, setPageRoute] = useState<PageRouteType>("web");
  const handlePageRoute = useCallback((page: PageRouteType) => {
    setPageRoute(page);
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Header pageRoute={pageRoute} handlePageRoute={handlePageRoute} />
      <Main>
        {pageRoute === "web" ? (
          <WebgamePage />
        ) : pageRoute === "mobile" ? (
          <MobilegamePage />
        ) : null}
      </Main>
      <Footer />
    </Suspense>
  );
}

const Main = styled.main`
  margin: auto;
  margin-top: ${(props) => props.theme.length.HEIGHT_HEADER}px;
  max-width: 2500px;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-top: ${(props) => props.theme.length.HEIGHT_HEADER_MOBILE}px;
  }
`;

export default App;
