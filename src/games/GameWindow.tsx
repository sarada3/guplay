import styled from "styled-components";
import { createPortal } from "react-dom";

interface GameWindowProps {
  children: React.ReactNode;
}

function GameWindow(props: GameWindowProps) {
  const { children } = props;
  const root = document.getElementById("game-portal") as HTMLElement;
  return createPortal(
    <Container>
      <InnerContainer>{children}</InnerContainer>
    </Container>,
    root
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
  background-color: white;
`;

export default GameWindow;
