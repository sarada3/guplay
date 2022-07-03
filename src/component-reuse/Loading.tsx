import OverlayScreenCenterBox from "./OverlayCenterBox";
import { loaderAnimated } from "../assets/icons";

import styled from "styled-components";

interface LoadingProps {
  translucent: boolean;
}

function Loading(props: LoadingProps) {
  const { translucent } = props;
  return (
    <OverlayScreenCenterBox translucent={translucent}>
      <LoaderContainer>{loaderAnimated}</LoaderContainer>
    </OverlayScreenCenterBox>
  );
}

const LoaderContainer = styled.div`
  width: 100px;
  height: 100px;
`;

export default Loading;
