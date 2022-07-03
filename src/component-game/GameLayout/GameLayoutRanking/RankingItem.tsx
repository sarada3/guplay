import UserRow from "../../../component-reuse/UserRow";

import styled from "styled-components";
import { useState, useEffect } from "react";

import { readUser } from "../../../utils/db";

import { IRanking, IUser } from "../../../types";

interface RankingItemprops {
  ranking: IRanking;
  index: number;
}

function RankingItem(props: RankingItemprops) {
  const { ranking, index } = props;
  const [ranker, setRanker] = useState<IUser>();

  useEffect(() => {
    const initFunc = async () => {
      const user = await readUser(ranking.userId);
      if (user) {
        setRanker(user);
      }
    };
    initFunc();
  }, [ranking.userId]);

  if (!ranker) {
    return null;
  }
  return (
    <Container>
      <div style={{ marginRight: 10 }}>{index + 1}</div>
      <div style={{ flex: 1 }}>
        <UserRow user={ranker} />
      </div>
      <div>{ranking.recordToRender}</div>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export default RankingItem;
