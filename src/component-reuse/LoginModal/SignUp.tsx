import {
  Container,
  InputContainer,
  ForgotPassword,
  TitleContainer,
  Title,
  Label,
  Input,
  Actions,
  LoginButton,
} from "./SignIn";
import { TextSmall, TextBlue } from "../StyledComponent";
import { loaderAnimated } from "../../assets/icons";

import { LoginRouteType } from "../../types";

interface SignUpProps {
  loading: boolean;
  signUpUser: () => void;
  replaceLoginRoute: (route: LoginRouteType) => void;
  onChangeFormValues: (key: string, value: string) => void;
}

function SignUp(props: SignUpProps) {
  const { loading, signUpUser, replaceLoginRoute, onChangeFormValues } = props;
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
      <ForgotPassword
        type="button"
        onClick={() => replaceLoginRoute("forgotpassword")}
      >
        <TextBlue>Forgot password?</TextBlue>
      </ForgotPassword>
      <Actions>
        <button type="button" onClick={() => replaceLoginRoute("signin")}>
          <TextBlue>Already signed up?</TextBlue>
        </button>
        <LoginButton type="button" onClick={signUpUser}>
          {loading ? (
            <div style={{ width: 30, height: 30 }}>{loaderAnimated}</div>
          ) : (
            "Sign up"
          )}
        </LoginButton>
      </Actions>
      <TextSmall>
        Contact:
        <TextBlue>
          <a href="mailto:eoldamstory@gmail.com">eoldamstory@gmail.com</a>
        </TextBlue>
      </TextSmall>
    </Container>
  );
}

export default SignUp;
