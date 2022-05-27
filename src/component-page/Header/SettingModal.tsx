import styled, { keyframes } from "styled-components";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { useUserContext } from "../../utils/hooks/useContextCustom";

import {
  TextSmall,
  TextBlue,
  HoverButton,
} from "../../component-reuse/StyledComponent";
import { gear, rightBracket } from "../../assets/icons";

import { IUser, PageRouteType } from "../../types";

interface SettingModalProps {
  user: IUser;
  closeSettingModal: () => void;
  replacePageRoute: (routeL: PageRouteType) => void;
}

function SettingModal(props: SettingModalProps) {
  const { user, closeSettingModal, replacePageRoute } = props;
  const { resetUser } = useUserContext();

  const onClickActionItem = (route: PageRouteType) => {
    closeSettingModal();
    replacePageRoute(route);
  };
  const logout = async () => {
    await signOut(auth);
    resetUser();
  };

  return (
    <Container>
      <ClickingDiv onClick={closeSettingModal} />
      <InnerContainer>
        <Top>
          <Name>{user.name}</Name>
          <TextSmall>
            <TextBlue>{user.email}</TextBlue>
          </TextSmall>
        </Top>
        <Actions>
          <ActionItemMobileOnly onClick={() => onClickActionItem("web")}>
            <ActionItemIcon>{gear}</ActionItemIcon>WEB
          </ActionItemMobileOnly>
          <ActionItemMobileOnly onClick={() => onClickActionItem("mobile")}>
            <ActionItemIcon>{gear}</ActionItemIcon>MOBILE
          </ActionItemMobileOnly>
          <ActionItem onClick={() => onClickActionItem("mypage")}>
            <ActionItemIcon>{gear}</ActionItemIcon>Profile setting
          </ActionItem>
          <ActionItem onClick={logout}>
            <ActionItemIcon>{rightBracket}</ActionItemIcon>Logout
          </ActionItem>
        </Actions>
      </InnerContainer>
    </Container>
  );
}

const scaleUp = () => keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 15px;
  padding: 15px 20px 15px 20px;
  width: 250px;
  background: white;
  box-shadow: 2px 2px 2px 2px lightgray;
  transform-origin: top right;
  animation: ${scaleUp} 0.1s ease-out;
`;

const InnerContainer = styled.div`
  position: relative;
`;

const ClickingDiv = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  /* background: transparent; */
`;

const Top = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid lightgray;
`;

const Name = styled.div`
  margin-bottom: 5px;
  font-size: 22px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionItem = styled(HoverButton)`
  /* margin: 10px 0 10px 0; */
  padding: 20px 10px 20px 10px;
  width: 100%;
  justify-content: flex-start;
  color: #3f3f3f;
  fill: #3f3f3f;
`;

const ActionItemMobileOnly = styled(ActionItem)`
  display: none;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    display: flex;
    &:nth-child(2) {
      border-bottom: 1px solid lightgray;
    }
  }
`;

const ActionItemIcon = styled.div`
  margin-right: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
`;

export default SettingModal;
