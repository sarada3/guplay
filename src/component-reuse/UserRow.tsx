import UserThumbnail from "./UserThumbnail";

import styled from "styled-components";

import { IUser } from "../types";

interface UserRowProps {
  user: IUser;
}

function UserRow(props: UserRowProps) {
  const { user } = props;
  return (
    <Container>
      <Thumbnail>
        <UserThumbnail user={user} />
      </Thumbnail>
      <div style={{ flexShrink: 0 }}>{user.name}</div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Thumbnail = styled.div`
  flex-shrink: 0;
  margin-right: 10px;
  width: 30px;
  height: 30px;
`;

export default UserRow;
