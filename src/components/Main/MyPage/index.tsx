import styled from "styled-components";
import { useState } from "react";
import { auth } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { useUserContext } from "../../../utils/hooks/useContextCustom";
import { validateName } from "../../../utils";

import UserThumbnail from "../../reuse/UserThumbnail";
import { TextSmall, HoverButton } from "../../reuse/StyledComponent";

function MyPage() {
  const { user } = useUserContext();
  const [name, setName] = useState(user?.name || "");
  const [inputEnabled, setInputEnabled] = useState(false);
  const onChangeInputName = (value: string) => {
    setName(value);
  };
  const toggleInputEnabled = () => {
    setInputEnabled((prev) => !prev);
  };
  const updateName = () => {
    if (validateName(name)) {
      toggleInputEnabled();
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
    } else {
      alert("Username must be less than 30 alpha numeric word.");
    }
  };
  if (!user) {
    return null;
  }
  return (
    <Container>
      <Title>Settings</Title>
      <Contents>
        <ThumbnailContainer>
          <UserThumbnail user={user} />
        </ThumbnailContainer>
        <div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
          >
            <NameInput
              disabled={!inputEnabled}
              value={name}
              onChange={(e) => onChangeInputName(e.target.value)}
            ></NameInput>
            {inputEnabled ? (
              <>
                <ModifyButton marginRight={5} onClick={updateName}>
                  OK
                </ModifyButton>
                <ModifyButton marginRight={0} onClick={toggleInputEnabled}>
                  Cancel
                </ModifyButton>
              </>
            ) : (
              <ModifyButton marginRight={0} onClick={toggleInputEnabled}>
                modify
              </ModifyButton>
            )}
          </div>
          <Email>{user.email}</Email>
        </div>
      </Contents>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.h1`
  margin-bottom: 50px;
  font-size: 32px;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
`;

const ThumbnailContainer = styled.div`
  margin-right: 30px;
  width: 100px;
  height: 100px;
`;

const NameInput = styled.input`
  margin-right: 10px;
  padding: 5px 10px 5px 10px;
  font-size: 24px;
  &:enabled {
    outline: 1px solid black;
    border-radius: 3px;
  }
`;

const ModifyButton = styled(HoverButton)<{ marginRight: number }>`
  margin-right: ${(props) => props.marginRight}px;
  padding: 5px 10px 5px 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const Email = styled(TextSmall)`
  padding-left: 10px;
`;

export default MyPage;
