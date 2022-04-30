import styled from "styled-components";

import PageRouter from "./PageRouter";
import { playstore, search, questionmark } from "../Etc/Icons/fontawesome";

import { PageRouteType } from "../../types";

interface HeaderProps {
  pageRoute: PageRouteType;
  handlePageRoute: (page: PageRouteType) => void;
}

function Header(props: HeaderProps) {
  const { pageRoute, handlePageRoute } = props;
  return (
    <Container>
      <InnerContainer>
        <Nav>
          <Logo href="/">
            <LogoImg>{playstore}</LogoImg>
            <LogoTitle>Gu play</LogoTitle>
          </Logo>
          <PageRouter pageRoute={pageRoute} handlePageRoute={handlePageRoute} />
        </Nav>
        <div style={{ display: "flex" }}>
          <ActionItem>{search}</ActionItem>
          <ActionItem>{questionmark}</ActionItem>
          <ActionItem>{search}</ActionItem>
        </div>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.header`
  padding: 0 15px 0 15px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: ${(props) => props.theme.length.HEIGHT_HEADER}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    height: ${(props) => props.theme.length.HEIGHT_HEADER_MOBILE}px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.a`
  height: inherit;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.span`
  margin-right: 10px;
  width: 35px;
  height: 30px;
  fill: #32d1ff;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-right: 5px;
    width: 35px;
    height: 30px;
  }
`;

const LogoTitle = styled.span`
  font-size: 25px;
  font-weight: 600;
`;

const ActionItem = styled.button`
  padding: 14px;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  fill: ${(props) => props.theme.color.TEXT_ACTIVE};
  &:hover {
    background-color: #eee;
  }
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    padding: 9px;
    width: 32px;
    height: 32px;
  }
`;

export default Header;
