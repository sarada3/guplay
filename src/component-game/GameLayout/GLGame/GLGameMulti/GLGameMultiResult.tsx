import LoginModal from "../../../../component-reuse/LoginModal";
import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import styled from "styled-components";

import { IUser } from "../../../../types";

interface GLGameMultiResultProps {
  user: IUser | null;
}

function GLGameMultiResult(props: GLGameMultiResultProps) {
  const { user } = props;

  return (
    <Container>
      <Info>
        <div>Your Win!</div>
        <div>Try another match in Lobby</div>
      </Info>
    </Container>
  );
}

const Container = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Info = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

export default GLGameMultiResult;
