import styled from "styled-components";
import React, { useState } from "react";

import { TextSmall, TextBlue } from "../reuse/StyledComponent";

import { LoginRouteType } from "../../types";

interface SignInProps {
  signInUser: () => void;
  replaceLoginRoute: (route: LoginRouteType) => void;
  onChangeFormValues: (key: string, value: string) => void;
}

function SignIn(props: SignInProps) {
  const { signInUser, replaceLoginRoute, onChangeFormValues } = props;
  return (
    <Container>
      <TitleContainer>
        <Title>로그인</Title>
        <div>Guplay에 로그인</div>
      </TitleContainer>
      <InputContainer>
        <Label htmlFor="id">EMAIL</Label>
        <Input
          required
          type="email"
          name="email"
          onChange={(e) => onChangeFormValues("email", e.target.value)}
        ></Input>
        <Label htmlFor="password">PASSWORD</Label>
        <Input
          required
          type="password"
          name="password"
          onChange={(e) => onChangeFormValues("password", e.target.value)}
        ></Input>
      </InputContainer>
      <button type="button" onClick={() => replaceLoginRoute("forgotpassword")}>
        <TextBlue>Forgot password?</TextBlue>
      </button>
      <Actions>
        <button type="button" onClick={() => replaceLoginRoute("signup")}>
          <TextBlue>계정 만들기</TextBlue>
        </button>
        <LoginButton type="button" onClick={signInUser}>
          로그인
        </LoginButton>
      </Actions>
      <TextSmall>
        계정문의:
        <TextBlue>
          <a href="mailto:eoldamstory@gmail.com">eoldamstory@gmail.com</a>
        </TextBlue>
      </TextSmall>
    </Container>
  );
}

export const Container = styled.form`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const TitleContainer = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 600;
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  text-align: left;
`;

export const Input = styled.input`
  margin-bottom: 30px;
  padding: 8px 15px 8px 15px;
  width: 100%;
  height: 45px;
  font-size: 18px;
  border: 1px solid #dadce0;
  border-radius: 5px;
`;

export const Actions = styled.div`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LoginButton = styled.button`
  padding: 10px 12px 10px 12px;
  color: white;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.TEXT_BLUE};
  &:hover {
    box-shadow: 0px 0px 2px darkblue;
  }
`;

export default SignIn;
