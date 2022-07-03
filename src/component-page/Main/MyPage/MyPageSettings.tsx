import UserThumbnail from "../../../component-reuse/UserThumbnail";
import {
  TextSmall,
  HoverEffect,
} from "../../../component-reuse/StyledComponent";

import styled from "styled-components";
import { useState } from "react";

import { validateName } from "../../../utils";
import { updateUser } from "../../../utils/db";

import { IUser } from "../../../types";

interface MyPageSettingProp {
  user: IUser;
  dispatchUser: (user: IUser) => void;
}

function MyPageSetting(props: MyPageSettingProp) {
  const { user, dispatchUser } = props;
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
      const newUser = { ...user, name };
      await updateUser(user.id, newUser);
      dispatchUser(newUser);
      disableInput();
    } else {
      alert("Username must be 1~10 alpha numeric word.");
    }
  };
  return (
    <Container>
      <Title>Settings</Title>
      <Contents>
        <Thumbnail>
          <UserThumbnail user={user} />
        </Thumbnail>
        <Info>
          <InfoName>
            <InfoNameInput
              disabled={!inputEnabled}
              value={name}
              size={10}
              onChange={(e) => onChangeInputName(e.target.value)}
            ></InfoNameInput>
            {inputEnabled ? (
              <div style={{ display: "flex" }}>
                <ModifyButton marginRight={5} onClick={updateName}>
                  <HoverEffect padding="10px 15px 10px 15px">OK</HoverEffect>
                </ModifyButton>
                <ModifyButton marginRight={0} onClick={onClickCancle}>
                  <HoverEffect padding="10px 15px 10px 15px">
                    Cancel
                  </HoverEffect>
                </ModifyButton>
              </div>
            ) : (
              <ModifyButton marginRight={0} onClick={enableInput}>
                <HoverEffect padding="10px 15px 10px 15px">modify</HoverEffect>
              </ModifyButton>
            )}
          </InfoName>
          <TextSmall>{user.email}</TextSmall>
        </Info>
      </Contents>
    </Container>
  );
}

const Container = styled.section`
  margin-bottom: 100px;
`;

const Title = styled.h1`
  margin-bottom: 50px;
  font-size: 32px;
`;

const Contents = styled.div`
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    flex-direction: column;
  }
`;

const Thumbnail = styled.div`
  margin-right: 30px;
  width: 100px;
  height: 100px;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-right: 0px;
    margin-bottom: 30px;
  }
`;

const Info = styled.div`
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    /* padding: 0 20px 0 20px; */
  }
`;

const InfoName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-bottom: 0px;
  }
`;

const InfoNameInput = styled.input`
  margin-right: 10px;
  padding: 5px 0px 5px 0px;
  font-size: 24px;
  &:enabled {
    outline: 1px solid black;
    border-radius: 3px;
  }
`;

const ModifyButton = styled.button<{ marginRight: number }>`
  margin-right: ${(props) => props.marginRight}px;
  padding: 0;
  border: 1px solid lightgray;
  border-radius: 100px;
  overflow: hidden;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-right: 0px;
  }
`;

export default MyPageSetting;
