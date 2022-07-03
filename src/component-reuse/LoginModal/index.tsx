import OverlayScreenCenterBox from "../OverlayCenterBox";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import Error from "../Error";
import { FlexCenter } from "../StyledComponent";
import { xmark } from "../../assets/icons";

import styled from "styled-components";
import { useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../../firebase";
import { validateEmail } from "../../utils";
import { createUser } from "../../utils/db";
import useLoadingAndError from "../../utils/hooks/useLoadingAndError";
import { useUserContext } from "../../utils/hooks/useContextCustom";

import { LoginRouteType, IUser } from "../../types";

interface LoginModalProps {
  closeLoginModal: () => void;
}

function LoginModal(props: LoginModalProps) {
  const { closeLoginModal } = props;
  const { dispatchUser } = useUserContext();
  const { loading, error, startLoading, endLoading, invokeError } =
    useLoadingAndError();
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
  const signInUser = () => {
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
            throw error;
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
        invokeError();
      } finally {
        endLoading();
      }
    }
  };
  const _sendPasswordResetEmail = () => {
    if (!validateEmail(formValue.email)) {
      alert("You have entered an invalid email address");
    } else {
      sendPasswordResetEmail(auth, formValue.email)
        .then(() => {
          alert("Email sent");
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            alert("There is no user to corresponding this email");
          } else {
            invokeError();
          }
        });
    }
  };
  if (error) {
    return <Error />;
  }
  return (
    <OverlayScreenCenterBox translucent={true}>
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
          <ForgotPassword
            _sendPasswordResetEmail={_sendPasswordResetEmail}
            replaceLoginRoute={replaceLoginRoute}
            onChangeFormValues={onChangeFormValues}
          />
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
  flex-direction: column;
  background: white;
  border: 1px solid #dadce0;
  border-radius: 20px;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    width: 95%;
    min-width: 95%;
    margin: auto;
  }
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
