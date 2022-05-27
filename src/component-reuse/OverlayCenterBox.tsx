import styled from "styled-components";
import { createPortal } from "react-dom";
import { FlexCenter } from "./StyledComponent";

interface OverlayScreenCenterBoxProps {
  translucent: boolean;
  onClickOuter?: () => void;
  children: React.ReactNode;
}

function OverlayScreenCenterBox(props: OverlayScreenCenterBoxProps) {
  const { translucent, onClickOuter, children } = props;
  const overlayScreenDom = document.getElementById(
    "overlay-screen"
  ) as HTMLElement;
  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };
  return createPortal(
    <Container onClick={onClickOuter || undefined} translucent={translucent}>
      <div onClick={stopPropagation}>{children}</div>
    </Container>,
    overlayScreenDom
  );
}

const Container = styled(FlexCenter)<{ translucent: boolean }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) =>
    props.translucent ? "rgb(20,20,20, 0.8)" : "rgba(20,20,20)"};
`;

export default OverlayScreenCenterBox;
