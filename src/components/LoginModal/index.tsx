import styled from "styled-components";
import { useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase";
import { validateEmail } from "../../utils";

import OverlayScreenCenterBox from "../reuse/OverlayCenterBox";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { FlexCenter } from "../reuse/StyledComponent";
import { xmark } from "../reuse/Icons";

import { LoginRouteType } from "../../types";

interface LoginProps {
  closeModal: (key: string) => void;
}

function Login(props: LoginProps) {
  const { closeModal } = props;
  const [loginRoute, setLoginRoute] = useState<LoginRouteType>("signin");
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const onChangeFormValues = useCallback((key: string, value: string) => {
    setFormValue((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);
  const replaceLoginRoute = useCallback((route: LoginRouteType) => {
    setFormValue({ email: "", password: "", passwordConfirm: "" });
    setLoginRoute(route);
  }, []);
  const signInUser = async () => {
    if (!validateEmail(formValue.email)) {
      alert("You have entered an invalid email address");
    } else {
      signInWithEmailAndPassword(auth, formValue.email, formValue.password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          alert("Please check your email and password");
        });
    }
  };
  const signUpUser = () => {
    if (!validateEmail(formValue.email)) {
      alert("You have entered an invalid email address");
    } else if (formValue.password !== formValue.passwordConfirm) {
      alert("Passwords do not match. Please confirm your password");
    } else {
      createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
        .then((userCredential) => {
          if (userCredential && userCredential.user.email) {
            updateProfile(userCredential.user, {
              displayName: userCredential.user.email.split("@")[0],
              photoURL: "/users/default.png",
            });
          }
        })
        .catch((error) => {
          if (error.code === "auth/weak-password") {
            alert("Password should be at least 6 characters");
          } else {
            alert("Please check your email and password");
          }
        });
    }
  };
  return (
    <OverlayScreenCenterBox translucent={true}>
      <InnerContainer>
        <CloseButton onClick={() => closeModal("login")}>{xmark}</CloseButton>
        <Logo>Guplay</Logo>
        {loginRoute === "signin" ? (
          <SignIn
            signInUser={signInUser}
            replaceLoginRoute={replaceLoginRoute}
            onChangeFormValues={onChangeFormValues}
          />
        ) : loginRoute === "signup" ? (
          <SignUp
            signUpUser={signUpUser}
            replaceLoginRoute={replaceLoginRoute}
            onChangeFormValues={onChangeFormValues}
          />
        ) : loginRoute === "forgotpassword" ? (
          <ForgotPassword />
        ) : null}
      </InnerContainer>
    </OverlayScreenCenterBox>
  );
}

const InnerContainer = styled(FlexCenter)`
  position: relative;
  padding: 50px;
  width: 30%;
  min-width: 400px;
  max-width: 700px;
  /* height: 70%; */
  flex-direction: column;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 20px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
`;

const Logo = styled.div`
  margin-bottom: 30px;
  height: 10%;
  font-size: 24px;
  font-weight: 600;
`;

export default Login;
