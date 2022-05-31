import styled from "styled-components";

import { arrowLeft, arrowRight } from "../../../assets/icons";

interface MobileLayoutRouterProps {
  lobbyExist: boolean;
}

function MobileLayoutRouter(props: MobileLayoutRouterProps) {
  const { lobbyExist } = props;
  return (
    <Container>
      <RouterLinkLeft>
        <ArrowIcon>{arrowLeft}</ArrowIcon>
        <div>Lobby</div>
      </RouterLinkLeft>
      <RouterLinkRight>
        <ArrowIcon>{arrowRight}</ArrowIcon>
        <div>Ranking</div>
      </RouterLinkRight>
    </Container>
  );
}

const Container = styled.div`
  display: none;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    position: absolute;
    inset: 10px 10px auto 10px;
    display: flex;
    justify-content: space-between;
  }
`;

const RouterLinkLeft = styled.div`
  display: flex;
  align-items: center;
`;

const RouterLinkRight = styled(RouterLinkLeft)`
  flex-direction: row-reverse;
`;

const ArrowIcon = styled.div`
  width: 20px;
  height: 15px;
`;

export default MobileLayoutRouter;
