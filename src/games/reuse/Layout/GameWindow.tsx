import styled from "styled-components";
import { createPortal } from "react-dom";

interface GameWindowProps {
  children: React.ReactNode;
}

function GameWindow(props: GameWindowProps) {
  const { children } = props;
  const gameDom = document.getElementById("game") as HTMLElement;
  return createPortal(
    <Container>
      <InnerContainer>{children}</InnerContainer>
    </Container>,
    gameDom
  );
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(136, 136, 136, 0.7);
`;

const InnerContainer = styled.div`
  width: 90%;
  height: 90%;
  display: grid;
  grid-template-areas:
    "header header header"
    "lobby game ranking";
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 50px 1fr;
  border: 1px solid black;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    width: 95%;
    height: 95%;
    grid-template-areas:
      "header"
      "game"
      "lobby"
      "ranking";
    grid-template-columns: 100%;
    grid-template-rows: 10% 90% 100% 100%;
    overflow-y: auto;
  }
`;

// const InnerContainer = styled.div`
//   width: 90%;
//   height: 90%;
//   display: grid;
//   grid-template-columns: 1fr 50% 1fr;
//   border: 1px solid black;
//   @media ${(props) => props.theme.device.UPTO_TABLET} {
//     width: 95%;
//     height: 95%;
//     grid-template-columns: 1fr;
//     grid-template-rows: 100%;
//     grid-auto-rows: 100%;
//     overflow-y: auto;
//   }
// `;

export default GameWindow;
