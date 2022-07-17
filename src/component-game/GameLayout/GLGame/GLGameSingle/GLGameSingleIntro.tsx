import {
  FlexCenter,
  TextTitle,
} from "../../../../component-reuse/StyledComponent";

import styled from "styled-components";

import { IGame } from "../../../../types";

interface GLGameSingleIntroProps {
  game: IGame;
  selectedDifficulty: string;
  enterToPlaying: () => void;
  onChangeDifficulty: (difficultyValue: string) => void;
}

function GLGameSingleIntro(props: GLGameSingleIntroProps) {
  const {
    game: { difficulties, title, creator },
    selectedDifficulty,
    enterToPlaying,
    onChangeDifficulty,
  } = props;

  return (
    <Container>
      <div style={{ marginBottom: 15 }}>
        <TextTitle>{title}</TextTitle>
      </div>
      <div>Difficulty</div>
      <Radio>
        {difficulties.map((d) => (
          <RadioItem key={d}>
            <input
              type="radio"
              id={d}
              value={d}
              checked={selectedDifficulty === d}
              onChange={() => onChangeDifficulty(d)}
            />
            <label htmlFor={d}>{d}</label>
          </RadioItem>
        ))}
      </Radio>
      <PlayButton onClick={enterToPlaying}>PLAY</PlayButton>
      <Creator>created by {creator.name}</Creator>
    </Container>
  );
}

const Container = styled(FlexCenter)`
  height: 100%;
  flex-direction: column;
`;

const Radio = styled.ul`
  margin-bottom: 15px;
  display: flex;
`;

const RadioItem = styled.li`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const PlayButton = styled.button`
  padding: 10px 20px 10px 20px;
  font-size: 22px;
  background: white;
  border-radius: 10px;
`;

const Creator = styled.div`
  position: absolute;
  bottom: 10%;
`;

export default GLGameSingleIntro;
