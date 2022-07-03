import { TextSmall, TextBlue } from "../../component-reuse/StyledComponent";
import { gear, rightBracket } from "../../assets/icons";

import styled, { keyframes } from "styled-components";

import { IUser, PageRouteType } from "../../types";

interface SettingModalProps {
  user: IUser;
  closeSettingModal: () => void;
  replacePageRoute: (routeL: PageRouteType) => void;
  handleLogout: () => void;
}

function SettingModal(props: SettingModalProps) {
  // console.log("SettingModal");
  const { user, closeSettingModal, replacePageRoute, handleLogout } = props;

  const onClickActionItem = (route: PageRouteType) => {
    closeSettingModal();
    replacePageRoute(route);
  };

  return (
    <Container>
      <ClickingDiv onClick={closeSettingModal} />
      <InnerContainer>
        <Info>
          <Name>{user.name}</Name>
          <TextSmall>
            <TextBlue>{user.email}</TextBlue>
          </TextSmall>
        </Info>
        <Actions>
          <ActionItemMobileOnly onClick={() => onClickActionItem("web")}>
            <ActionItemIcon>{gear}</ActionItemIcon>WEB
          </ActionItemMobileOnly>
          <ActionItemMobileOnly onClick={() => onClickActionItem("mobile")}>
            <ActionItemIcon>{gear}</ActionItemIcon>MOBILE
          </ActionItemMobileOnly>
          <ActionItem onClick={() => onClickActionItem("mypage")}>
            <ActionItemIcon>{gear}</ActionItemIcon>MY PAGE
          </ActionItem>
          <ActionItem onClick={handleLogout}>
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

const ClickingDiv = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
`;

const InnerContainer = styled.div`
  position: relative;
`;

const Info = styled.div`
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

const ActionItem = styled.button`
  display: flex;
  padding: 15px 10px 15px 10px;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
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
