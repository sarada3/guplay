import styled from "styled-components";
import { useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import useLoadingAndError from "../../utils/hooks/useLoadingAndError";
import { useUserContext } from "../../utils/hooks/useContextCustom";
import { auth } from "../../firebase";
import { validateEmail } from "../../utils";
import { createUser } from "../../utils/db";

import OverlayScreenCenterBox from "../OverlayCenterBox";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { FlexCenter } from "../StyledComponent";
import { xmark } from "../../assets/icons";

import { LoginRouteType, IUser } from "../../types";

interface LoginModalProps {
  closeLoginModal: () => void;
}

function LoginModal(props: LoginModalProps) {
  const { closeLoginModal } = props;
  const { dispatchUser } = useUserContext();
  const { loading, startLoading, endLoading } = useLoadingAndError();
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
      startLoading();
      signInWithEmailAndPassword(auth, formValue.email, formValue.password)
        .then((userCredential) => {
          closeLoginModal();
          // dispatch user in onAuthchanged
        })
        .catch((error) => {
          alert("Please check your email and password");
        })
        .finally(() => {
          endLoading();
        });
    }
  };
  const signUpUser = async () => {
    if (!validateEmail(formValue.email)) {
      alert("You have entered an invalid email address");
    } else if (formValue.password !== formValue.passwordConfirm) {
      alert("Passwords do not match. Please confirm your password");
    } else {
      startLoading();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        ).catch((error) => {
          if (error.code === "auth/weak-password") {
            alert("Password should be at least 6 characters");
          } else if (error.code === "auth/email-already-in-use") {
            alert("This email address is already in use");
          } else {
            alert("Please check your email and password");
          }
        });
        if (userCredential && userCredential.user.email) {
          const user: IUser = {
            id: userCredential.user.uid,
            name: userCredential.user.email.split("@")[0].slice(0, 10),
            email: userCredential.user.email,
            thumbnail: "/users/default.png",
          };
          await createUser(user);
          dispatchUser(user);
          closeLoginModal();
        }
      } catch (error) {
        console.error(error);
      } finally {
        endLoading();
      }
    }
  };
  return (
    <OverlayScreenCenterBox translucent={true} onClickOuter={closeLoginModal}>
      <InnerContainer>
        <CloseButton onClick={closeLoginModal}>{xmark}</CloseButton>
        <Logo>Guplay</Logo>
        {loginRoute === "signin" ? (
          <SignIn
            loading={loading}
            signInUser={signInUser}
            replaceLoginRoute={replaceLoginRoute}
            onChangeFormValues={onChangeFormValues}
          />
        ) : loginRoute === "signup" ? (
          <SignUp
            loading={loading}
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

export default LoginModal;
