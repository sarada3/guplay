import styled from "styled-components";

import useLoginModalOpen from "../../../../utils/hooks/useLoginModalOpen";

import LoginModal from "../../../../component-reuse/LoginModal";
import UserRow from "../../../../component-reuse/UserRow";
import { FlexCenter } from "../../../../component-reuse/StyledComponent";

import { IUser } from "../../../../types";

interface FlipcardResultProps {
  user: IUser | null;
  recordToRender: string;
  onClickRetry: () => void;
  registerRanking: () => void;
}

function FlipcardResult(props: FlipcardResultProps) {
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
            <UserRow user={user} />
            {recordToRender}
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
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px 10px;
  }
`;

const RetryButton = styled.button`
  padding: 6px 10px 6px 10px;
  color: white;
  font-size: 20px;
  letter-spacing: 2px;
  &:hover {
    color: black;
  }
`;

const RegisterButton = styled(RetryButton)`
  @media ${(props) => props.theme.device.UPTO_MOBILE} {
    grid-column: 1/3;
  }
`;

const Action = styled.div`
  padding: 20px 0 20px 0;
  width: 100%;
  text-align: center;
`;

export default FlipcardResult;
