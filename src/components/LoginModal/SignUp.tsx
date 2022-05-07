import styled from "styled-components";
import React, { useState } from "react";

import {
  Container,
  InputContainer,
  TitleContainer,
  Title,
  Label,
  Input,
  Actions,
  LoginButton,
} from "./SignIn";
import { TextSmall, TextBlue } from "../reuse/StyledComponent";

import { LoginRouteType } from "../../types";

interface SignUpProps {
  signUpUser: () => void;
  replaceLoginRoute: (route: LoginRouteType) => void;
  onChangeFormValues: (key: string, value: string) => void;
}

function SignUp(props: SignUpProps) {
  const { signUpUser, replaceLoginRoute, onChangeFormValues } = props;
  return (
    <Container>
      <TitleContainer>
        <Title>회원가입</Title>
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
        <Label htmlFor="passwordConfirm">PASSWORD CONFIRM</Label>
        <Input
          required
          type="password"
          name="password"
          onChange={(e) =>
            onChangeFormValues("passwordConfirm", e.target.value)
          }
        ></Input>
      </InputContainer>
      <button type="button" onClick={() => replaceLoginRoute("forgotpassword")}>
        <TextBlue>Forgot password?</TextBlue>
      </button>
      <Actions>
        <button type="button" onClick={() => replaceLoginRoute("signin")}>
          <TextBlue>이미 계정이 있으신가요?</TextBlue>
        </button>
        <LoginButton type="button" onClick={signUpUser}>
          회원가입
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

export default SignUp;
