import {
  FlexCenter,
  TextTitle,
} from "../../../../component-reuse/StyledComponent";

import styled from "styled-components";

import { IGame } from "../../../../types";

interface GLGameMultiIntroProps {
  game: IGame;
}

function GLGameMultiIntro(props: GLGameMultiIntroProps) {
  const {
    game: { title, creator },
  } = props;
  return (
    <Container>
      <div style={{ marginBottom: 15 }}>
        <TextTitle>{title}</TextTitle>
      </div>

      <Creator>created by {creator.name}</Creator>
    </Container>
  );
}

const Container = styled(FlexCenter)`
  height: 100%;
  flex-direction: column;
`;

const Creator = styled.div`
  position: absolute;
  bottom: 10%;
`;

export default GLGameMultiIntro;
