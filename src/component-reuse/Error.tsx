import styled from "styled-components";

function Error() {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <Container>
      <Message>Something goes wrong</Message>
      <RefreshButton onClick={refreshPage}>Refresh</RefreshButton>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Message = styled.h1`
  margin-bottom: 20px;
  display: block;
  font-size: 28px;
  color: white;
`;

const RefreshButton = styled.button`
  font-size: 22px;
  color: skyblue;
`;

export default Error;
