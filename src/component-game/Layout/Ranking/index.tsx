import styled from "styled-components";
import { useState } from "react";

import RankingItem from "./RankingItem";
import { TextSmall } from "../../../component-reuse/StyledComponent";

import { IRanking } from "../../../types";

interface RankingProps {
  rankingList: Array<IRanking>;
  difficulties: Array<string>;
}

function Ranking(props: RankingProps) {
  const { rankingList, difficulties } = props;
  const [tab, setTab] = useState(difficulties[0]);

  const toggleTab = (tabName: string) => {
    setTab(tabName);
  };
  const selectedList = rankingList
    .filter((ranking) => ranking.difficulty === tab)
    .sort((a, b) => a.record - b.record);

  return (
    <Container>
      <Title>RANKING</Title>
      {difficulties.length > 0 && (
        <Tab>
          {difficulties.map((difficulty) => (
            <TabItem key={difficulty} isActive={difficulty === tab}>
              <button onClick={() => toggleTab(difficulty)}>
                {difficulty}
              </button>
            </TabItem>
          ))}
        </Tab>
      )}
      <RankItemContainer>
        {selectedList.length === 0 ? (
          <TextSmall>no data</TextSmall>
        ) : (
          selectedList.map((ranking, index) => (
            <RankingItem
              key={ranking.userId + ranking.difficulty}
              ranking={ranking}
              index={index}
            />
          ))
        )}
      </RankItemContainer>
    </Container>
  );
}

const Container = styled.div`
  grid-area: ranking;
  background-color: skyblue;
  text-align: center;
`;

const Title = styled.div`
  margin-top: 10px;
  letter-spacing: 2px;
  font-weight: 600;
`;

const Tab = styled.div`
  padding: 15px 7px 15px 7px;
  display: flex;
  border-bottom: 1px dotted white;
`;

const TabItem = styled.div<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  color: ${(props) => (props.isActive ? "black" : "gray")};
  &:first-child {
    border-right: 2px solid white;
  }
`;

const RankItemContainer = styled.ul`
  padding: 10px;
  width: 100%;
  min-width: 200px;
  overflow-x: auto;
`;

export default Ranking;
