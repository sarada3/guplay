import styled from "styled-components";
import { createPortal } from "react-dom";
import { FlexCenter } from "../../components/reuse/StyledComponent";

interface OverlayScreenCenterBoxProps {
  children: React.ReactNode;
  handleClickOuter?: () => void;
  translucent: boolean;
}

function OverlayScreenCenterBox(props: OverlayScreenCenterBoxProps) {
  const { handleClickOuter, children, translucent } = props;
  const overlayScreenDom = document.getElementById(
    "overlay-screen"
  ) as HTMLElement;
  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };
  return createPortal(
    <Container
      onClick={handleClickOuter || undefined}
      translucent={translucent}
    >
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
    props.translucent ? "rgb(105,105,105, 0.7)" : "rgba(105,105,105)"};
`;

export default OverlayScreenCenterBox;
