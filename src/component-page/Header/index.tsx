import LoginModal from "../../component-reuse/LoginModal";
import HeaderPageRouter from "./HeaderPageRouter";
import HeaderActions from "./HeaderActions";
import SettingModal from "./SettingModal";

import styled from "styled-components";
import { useState, useCallback } from "react";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import useLoginModalOpen from "../../utils/hooks/useLoginModalOpen";
import { useUserContext } from "../../utils/hooks/useContextCustom";

import { PageRouteType } from "../../types";

interface HeaderProps {
  pageRoute: PageRouteType;
  replacePageRoute: (route: PageRouteType) => void;
}

function Header(props: HeaderProps) {
  const { pageRoute, replacePageRoute } = props;
  const { user, resetUser } = useUserContext();
  const { loginModalOpen, openLoginModal, closeLoginModal } =
    useLoginModalOpen();
  const [settingModalOpen, setSettingModalOpen] = useState(false);

  const closeSettingModal = () => {
    setSettingModalOpen(false);
  };
  const onClickThumbnail = useCallback(() => {
    if (settingModalOpen) {
      setSettingModalOpen(false);
    } else {
      if (!user) {
        openLoginModal();
      } else {
        setSettingModalOpen(true);
      }
    }
  }, [user, openLoginModal, settingModalOpen]);
  const handleLogout = async () => {
    await signOut(auth);
    resetUser();
  };

  return (
    <>
      {loginModalOpen && <LoginModal closeLoginModal={closeLoginModal} />}
      <Container>
        <InnerContainer>
          <HeaderPageRouter
            pageRoute={pageRoute}
            replacePageRoute={replacePageRoute}
          />
          <HeaderActions user={user} onClickThumbnail={onClickThumbnail} />
        </InnerContainer>
        {user && settingModalOpen && (
          <SettingModal
            user={user}
            closeSettingModal={closeSettingModal}
            replacePageRoute={replacePageRoute}
            handleLogout={handleLogout}
          />
        )}
      </Container>
    </>
  );
}

const Container = styled.header`
  padding: 0 15px 0 15px;
  z-index: ${(props) => props.theme.zIndex.POSITION_FIXED.GUPLAY.HEADER};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    padding: 0 10px 0 10px;
  }
`;

const InnerContainer = styled.nav`
  width: 100%;
  height: ${(props) => props.theme.length.HEIGHT_HEADER}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    height: ${(props) => props.theme.length.HEIGHT_HEADER_MOBILE}px;
  }
`;

export default Header;
