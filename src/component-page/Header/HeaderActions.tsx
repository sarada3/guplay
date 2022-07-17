import UserThumbnail from "../../component-reuse/UserThumbnail";
import { HoverEffect } from "../../component-reuse/StyledComponent";
import { search, questionmark, plus } from "../../assets/icons";

import styled from "styled-components";
import { memo } from "react";

import { IUser } from "../../types";

interface HeaderActionsProps {
  user: IUser | null;
  onClickThumbnail: () => void;
}

function HeaderActions(props: HeaderActionsProps) {
  const { user, onClickThumbnail } = props;
  return (
    <Container>
      <ActionItem>
        <HoverEffect padding="14px 14px 14px 14px">{search}</HoverEffect>
      </ActionItem>
      <ActionItem>
        <HoverEffect padding="14px 14px 14px 14px">{questionmark}</HoverEffect>
      </ActionItem>
      <ActionItem onClick={onClickThumbnail}>
        <HoverEffect padding="10px 10px 10px 10px">
          {user ? <UserThumbnail user={user} /> : <PlusIcon>{plus}</PlusIcon>}
        </HoverEffect>
      </ActionItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const ActionItem = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 999px;
  overflow: hidden;
  fill: ${(props) => props.theme.color.TEXT_NORMAL};
`;

const PlusIcon = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default memo(HeaderActions);
