import styled from "styled-components";
import { useState, useEffect } from "react";

import { auth } from "../../../firebase";
import { validateName } from "../../../utils";
import { updateUser } from "../../../utils/db";
import { useUserContext } from "../../../utils/hooks/useContextCustom";

import UserThumbnail from "../../../component-reuse/UserThumbnail";
import {
  TextSmall,
  HoverButton,
} from "../../../component-reuse/StyledComponent";

import { PageRouteType } from "../../../types";

interface MyPageProps {
  replacePageRoute: (route: PageRouteType) => void;
}

function MyPage(props: MyPageProps) {
  const { replacePageRoute } = props;
  const { user, dispatchUser } = useUserContext();
  const [name, setName] = useState(user?.name || "");
  const [inputEnabled, setInputEnabled] = useState(false);

  const onChangeInputName = (value: string) => {
    setName(value);
  };
  const enableInput = () => {
    setInputEnabled(true);
  };
  const disableInput = () => {
    setInputEnabled(false);
  };
  const onClickCancle = () => {
    if (user) {
      setName(user.name);
      disableInput();
    }
  };
  const updateName = async () => {
    if (validateName(name)) {
      if (user && user.id && auth.currentUser) {
        const newUser = { ...user, name };
        await updateUser(user.id, newUser);
        dispatchUser(newUser);
        disableInput();
      }
    } else {
      alert("Username must be 1~10 alpha numeric word.");
    }
  };

  useEffect(() => {
    if (!user || !auth.currentUser) {
      replacePageRoute("web");
    }
  }, [user, replacePageRoute]);

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
                <ModifyButton marginRight={0} onClick={onClickCancle}>
                  Cancel
                </ModifyButton>
              </>
            ) : (
              <ModifyButton marginRight={0} onClick={enableInput}>
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
