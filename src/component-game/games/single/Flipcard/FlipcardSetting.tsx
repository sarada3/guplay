import styled from "styled-components";

import { NumOfCardPerLineType } from ".";

const THREE = 3;
const FIVE = 5;

interface FlipcardSettingProps {
  numOfCardPerLine: number;
  onChangeNumOfCardPerLine: (num: NumOfCardPerLineType) => void;
}

function FlipcardSetting(props: FlipcardSettingProps) {
  const { numOfCardPerLine, onChangeNumOfCardPerLine } = props;

  return (
    <div>
      <Title>DIFFICULTY</Title>
      <Radio>
        <RadioItem>
          <input
            type="radio"
            id="3x3"
            value={THREE}
            checked={numOfCardPerLine === THREE}
            onChange={() => onChangeNumOfCardPerLine(THREE)}
          />
          <label htmlFor="3x3">3x3</label>
        </RadioItem>
        <RadioItem>
          <input
            type="radio"
            id="5x5"
            value={FIVE}
            checked={numOfCardPerLine === FIVE}
            onChange={() => onChangeNumOfCardPerLine(FIVE)}
          />
          <label htmlFor="5x5">5x5</label>
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
