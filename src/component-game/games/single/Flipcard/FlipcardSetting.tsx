import styled from "styled-components";

import { Difficulty } from ".";

const THREE = "3x3";
const FIVE = "5x5";

interface FlipcardSettingProps {
  difficulty: string;
  onChangeDifficulty: (difficultyValue: Difficulty) => void;
}

function FlipcardSetting(props: FlipcardSettingProps) {
  const { difficulty, onChangeDifficulty } = props;

  return (
    <div>
      <Title>DIFFICULTY</Title>
      <Radio>
        <RadioItem>
          <input
            type="radio"
            id={THREE}
            value={THREE}
            checked={difficulty === THREE}
            onChange={() => onChangeDifficulty(THREE)}
          />
          <label htmlFor={THREE}>{THREE}</label>
        </RadioItem>
        <RadioItem>
          <input
            type="radio"
            id={FIVE}
            value={FIVE}
            checked={difficulty === FIVE}
            onChange={() => onChangeDifficulty(FIVE)}
          />
          <label htmlFor={FIVE}>{FIVE}</label>
        </RadioItem>
      </Radio>
    </div>
  );
}

const Title = styled.div`
  margin-bottom: 5px;
  text-align: center;
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

export default FlipcardSetting;
