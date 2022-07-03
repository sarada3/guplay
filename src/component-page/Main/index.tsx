import WebgamePage from "./WebgamePage";
import MobilegamePage from "./MobilegamePage";
import MyPage from "./MyPage";

import styled from "styled-components";
import { PageRouteType } from "../../types";

interface MainProps {
  pageRoute: PageRouteType;
  replacePageRoute: (route: PageRouteType) => void;
}

function Main(props: MainProps) {
  const { pageRoute, replacePageRoute } = props;
  return (
    <Container>
      {pageRoute === "web" ? (
        <WebgamePage />
      ) : pageRoute === "mobile" ? (
        <MobilegamePage />
      ) : pageRoute === "mypage" ? (
        <MyPage replacePageRoute={replacePageRoute} />
      ) : null}
    </Container>
  );
}

const Container = styled.main`
  margin-top: ${(props) => props.theme.length.HEIGHT_HEADER}px;
  padding: 50px 120px 0 120px;
  max-width: 2500px;
  min-height: 100vh;
  @media ${(props) => props.theme.device.UPTO_LAPTOP} {
    padding: 30px 80px 0 80px;
  }
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    padding: 20px 30px 0 30px;
  }
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    padding: 10px 10px 0 10px;
    margin-top: ${(props) => props.theme.length.HEIGHT_HEADER_MOBILE}px;
  }
`;

export default Main;
