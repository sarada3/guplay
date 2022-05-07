import styled, { keyframes } from "styled-components";

import {
  TextSmall,
  TextBlue,
  HoverButton,
} from "../../components/reuse/StyledComponent";
import { gear } from "../reuse/Icons";

import { IUser, PageRouteType } from "../../types";

interface SettingModalProps {
  user: IUser;
  closeModal: (key: string) => void;
  replacePageRoute: (routeL: PageRouteType) => void;
}

function SettingModal(props: SettingModalProps) {
  const { user, closeModal, replacePageRoute } = props;
  const onClickProfileSetting = () => {
    closeModal("setting");
    replacePageRoute("mypage");
  };
  return (
    <Container>
      <ClickingDiv onClick={() => closeModal("setting")} />
      <div style={{ position: "relative", background: "transparent" }}>
        <Top>
          <Name>{user.name}</Name>
          <TextSmall>
            <TextBlue>{user.email}</TextBlue>
          </TextSmall>
        </Top>
        <Actions>
          <ActionItem onClick={onClickProfileSetting}>
            <GearIcon>{gear}</GearIcon>Profile setting
          </ActionItem>
        </Actions>
      </div>
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

const ClickingDiv = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: transparent;
`;

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 15px;
  padding: 15px 20px 15px 20px;
  width: 250px;
  box-shadow: 2px 2px 2px 2px lightgray;
  transform-origin: top right;
  animation: ${scaleUp} 0.1s ease-out;
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
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ActionItem = styled(HoverButton)`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  justify-content: flex-start;
  color: #3f3f3f;
  fill: #3f3f3f;
`;

const GearIcon = styled.div`
  margin-right: 10px;
  display: inline-block;
  width: 20px;
  height: 20px;
`;

export default SettingModal;
