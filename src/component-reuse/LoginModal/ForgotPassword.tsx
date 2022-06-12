import styled from "styled-components";

import { TitleContainer, Input, Actions, LoginButton } from "./SignIn";
import { TextSmall, TextBlue } from "../StyledComponent";

import { LoginRouteType } from "../../types";

interface ForgotPasswordProps {
  _sendPasswordResetEmail: () => void;
  replaceLoginRoute: (route: LoginRouteType) => void;
  onChangeFormValues: (key: string, value: string) => void;
}

function ForgotPassword(props: ForgotPasswordProps) {
  const { _sendPasswordResetEmail, replaceLoginRoute, onChangeFormValues } =
    props;
  return (
    <Container>
      <TitleContainer>
        <TextSmall>
          <TextBlue>Please enter the email you used to sign up</TextBlue>
        </TextSmall>
      </TitleContainer>
      <Input
        required
        type="email"
        name="email"
        onChange={(e) => onChangeFormValues("email", e.target.value)}
      ></Input>
      <Actions>
        <button type="button" onClick={() => replaceLoginRoute("signin")}>
          <TextBlue>I remember</TextBlue>
        </button>
        <LoginButton type="button" onClick={_sendPasswordResetEmail}>
          Send email
        </LoginButton>
      </Actions>
    </Container>
  );
}

const Container = styled.div``;

export default ForgotPassword;
