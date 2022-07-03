import { FlexCenter } from "./StyledComponent";

import styled from "styled-components";
import { createPortal } from "react-dom";

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
  z-index: ${(props) => props.theme.zIndex.POSITION_FIXED.OVERLAY_CENTER_BOX};
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) =>
    props.translucent ? "rgb(20,20,20, 0.8)" : "rgba(20,20,20)"};
`;

export default OverlayScreenCenterBox;
