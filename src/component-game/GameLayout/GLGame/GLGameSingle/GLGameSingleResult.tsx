import LoginModal from "../../../../component-reuse/LoginModal";
import UserRow from "../../../../component-reuse/UserRow";
import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import styled from "styled-components";

import useLoginModalOpen from "../../../../utils/hooks/useLoginModalOpen";

import { IUser } from "../../../../types";

interface GLGameSingleResultProps {
  user: IUser | null;
  recordToRender: string;
  onClickRetry: () => void;
  registerRanking: () => void;
}

function GLGameSingleResult(props: GLGameSingleResultProps) {
  const { user, recordToRender, onClickRetry, registerRanking } = props;
  const { loginModalOpen, openLoginModal, closeLoginModal } =
    useLoginModalOpen();

  return (
    <>
      {loginModalOpen && <LoginModal closeLoginModal={closeLoginModal} />}
      <Container>
        <Info>
          <div>Your record is</div>
          <div style={{ fontSize: 28 }}>{recordToRender}</div>
        </Info>
        {user ? (
          <Rank>
            <Result>
              <UserRow user={user} />
              <div style={{ marginLeft: 20 }}>{recordToRender}</div>
            </Result>
            <RegisterButton onClick={registerRanking}>REGISTER</RegisterButton>
          </Rank>
        ) : (
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: 10 }}>
              You must log in to register for the record
            </p>
            <RegisterButton onClick={openLoginModal}>Login</RegisterButton>
          </div>
        )}
        <Action>
          <RetryButton onClick={onClickRetry}>RETRY</RetryButton>
        </Action>
      </Container>
    </>
  );
}

const Container = styled(FlexCenter)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const Info = styled.div`
  margin-bottom: 10px;
  text-align: center;
`;

const Rank = styled(FlexCenter)`
  display: flex;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    flex-direction: column;
  }
`;

const Result = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    margin-bottom: 10px;
  }
`;

const RegisterButton = styled.button`
  padding: 6px 10px 6px 10px;
  color: beige;
  border: 1px solid beige;
  border-radius: 999px;
  &:hover {
    color: white;
    border-color: white;
  }
`;

const RetryButton = styled.button`
  letter-spacing: 3px;
  text-decoration: underline;
  &:hover {
    color: black;
  }
`;

const Action = styled.div`
  padding: 20px 0 20px 0;
  width: 100%;
  text-align: center;
`;

export default GLGameSingleResult;
