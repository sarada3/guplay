import styled from "styled-components";
import { useState } from "react";

import { useUserContext } from "../../utils/hooks/useContextCustom";
import Login from "../LoginModal";
import SettingModal from "./SettingModal";
import UserThumbnail from "../reuse/UserThumbnail";
import PageRouter from "./PageRouter";
import { HoverButton } from "../reuse/StyledComponent";
import { playstore, search, questionmark, plus } from "../reuse/Icons";

import { PageRouteType } from "../../types";

interface HeaderProps {
  pageRoute: PageRouteType;
  replacePageRoute: (route: PageRouteType) => void;
}

function Header(props: HeaderProps) {
  const { pageRoute, replacePageRoute } = props;
  const [modalOpen, setModalOpen] = useState({ login: false, setting: false });
  const { user } = useUserContext();
  const onClickThumbnail = () => {
    if (modalOpen.setting) {
      setModalOpen((prev) => ({ ...prev, setting: false }));
      return;
    }
    if (!user) {
      setModalOpen((prev) => ({ ...prev, login: true }));
    } else {
      setModalOpen((prev) => ({ ...prev, setting: true }));
    }
  };
  const closeModal = (key: string) => {
    setModalOpen((prev) => ({ ...prev, [key]: false }));
  };
  return (
    <>
      {modalOpen.login && <Login closeModal={closeModal} />}
      <Container>
        <InnerContainer>
          <Nav>
            <Logo href="/">
              <LogoImg>{playstore}</LogoImg>
              <LogoTitle>Gu play</LogoTitle>
            </Logo>
            <PageRouter
              pageRoute={pageRoute}
              replacePageRoute={replacePageRoute}
            />
          </Nav>
          <div style={{ display: "flex" }}>
            <ActionItem padding={14}>{search}</ActionItem>
            <ActionItem padding={14}>{questionmark}</ActionItem>
            <ActionItem padding={10} onClick={onClickThumbnail}>
              {user ? (
                <UserThumbnail user={user} />
              ) : (
                <div style={{ width: "50%", height: "50%" }}>{plus}</div>
              )}
            </ActionItem>
          </div>
        </InnerContainer>
        {user && modalOpen.setting && (
          <SettingModal
            user={user}
            closeModal={closeModal}
            replacePageRoute={replacePageRoute}
          />
        )}
      </Container>
    </>
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
  fill: ${(props) => props.theme.color.LOGO};
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

const ActionItem = styled(HoverButton)<{ padding: number }>`
  position: relative;
  padding: ${(props) => props.padding}px;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  fill: ${(props) => props.theme.color.TEXT_NORMAL};
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    padding: 9px;
    width: 32px;
    height: 32px;
  }
`;

export default Header;
