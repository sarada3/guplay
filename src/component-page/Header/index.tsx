import styled from "styled-components";
import { useState } from "react";

import useLoginModalOpen from "../../utils/hooks/useLoginModalOpen";
import { useUserContext } from "../../utils/hooks/useContextCustom";

import LoginModal from "../../component-reuse/LoginModal";
import SettingModal from "./SettingModal";
import UserThumbnail from "../../component-reuse/UserThumbnail";
import PageRouter from "./PageRouter";
import { HoverButton } from "../../component-reuse/StyledComponent";
import { playstore, search, questionmark, plus } from "../../assets/icons";

import { PageRouteType } from "../../types";

interface HeaderProps {
  pageRoute: PageRouteType;
  replacePageRoute: (route: PageRouteType) => void;
}

function Header(props: HeaderProps) {
  const { pageRoute, replacePageRoute } = props;
  const { user } = useUserContext();
  const { loginModalOpen, openLoginModal, closeLoginModal } =
    useLoginModalOpen();
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  const closeSettingModal = () => {
    setSettingModalOpen(false);
  };
  const onClickThumbnail = () => {
    if (settingModalOpen) {
      setSettingModalOpen(false);
    } else {
      if (!user) {
        openLoginModal();
      } else {
        setSettingModalOpen(true);
      }
    }
  };

  return (
    <>
      {loginModalOpen && <LoginModal closeLoginModal={closeLoginModal} />}
      <Container>
        <InnerContainer>
          <Nav>
            <Logo onClick={() => replacePageRoute("web")}>
              <LogoImg>{playstore}</LogoImg>
              <LogoText>Gu play</LogoText>
            </Logo>
            <PageRouter
              pageRoute={pageRoute}
              replacePageRoute={replacePageRoute}
            />
          </Nav>
          <Actions>
            <ActionItem padding={14}>{search}</ActionItem>
            <ActionItem padding={14}>{questionmark}</ActionItem>
            <ActionItem padding={10} onClick={onClickThumbnail}>
              {user ? (
                <UserThumbnail user={user} />
              ) : (
                <div style={{ width: "50%", height: "50%" }}>{plus}</div>
              )}
            </ActionItem>
          </Actions>
        </InnerContainer>
        {user && settingModalOpen && (
          <SettingModal
            user={user}
            closeSettingModal={closeSettingModal}
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

const LogoText = styled.span`
  font-size: 25px;
  font-weight: 600;
`;

const Actions = styled.div`
  display: flex;
`;

const ActionItem = styled(HoverButton)<{ padding: number }>`
  position: relative;
  padding: ${(props) => props.padding}px;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  fill: ${(props) => props.theme.color.TEXT_NORMAL};
`;

export default Header;
