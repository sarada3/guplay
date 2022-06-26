import styled from "styled-components";
import React, { useState } from "react";

import RankingItem from "./RankingItem";
import { TextSmall } from "../../../component-reuse/StyledComponent";
import {
  LobbyContainer,
  LobbyInnerContainer,
  LobbyMobileCloseButton,
} from "../GameLayoutLobby";

import { IRanking } from "../../../types";

interface GameLayoutRankingProps {
  mobileOpen: boolean;
  closeMobileRoutes: () => void;
  rankingList: Array<IRanking>;
  difficulties: Array<string>;
}

function GameLayoutRanking(props: GameLayoutRankingProps) {
  const { mobileOpen, closeMobileRoutes, rankingList, difficulties } = props;
  const [tab, setTab] = useState(difficulties[0]);

  const toggleTab = (tabName: string) => {
    setTab(tabName);
  };
  const selectedList = rankingList
    .filter((ranking) => ranking.difficulty === tab)
    .sort((a, b) => a.record - b.record);

  return (
    <Container mobileOpen={mobileOpen}>
      <InnerContainer>
        <MobileCloseButton onClick={closeMobileRoutes}>{">"}</MobileCloseButton>
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
            <li>
              <TextSmall>no data</TextSmall>
            </li>
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
      </InnerContainer>
    </Container>
  );
}

const Container = styled(LobbyContainer)<{ mobileOpen: boolean }>`
  grid-area: ranking;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    grid-area: lobby_game_ranking;
    justify-content: flex-end;
    transform: ${(props) =>
      props.mobileOpen ? "translateX(0)" : "translateX(100%)"};
  }
`;

const InnerContainer = styled(LobbyInnerContainer)`
  background-color: skyblue;
`;

const MobileCloseButton = styled(LobbyMobileCloseButton)`
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    left: -20px;
  }
`;

const Title = styled.div`
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
  border-right: 2px solid white;
  &:last-child {
    border-right: none;
  }
`;

const RankItemContainer = styled.ul`
  padding: 10px;
  width: 100%;
  min-width: 200px;
  overflow-x: auto;
`;

export default React.memo(GameLayoutRanking);
