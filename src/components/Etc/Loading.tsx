import styled from "styled-components";

function Loading() {
  return <Container>Loading</Container>;
}

const Container = styled.div`
  position: fixed;
  z-index: 1;
  inset: 0;
  background-color: black;
  opacity: 0.5;
`;

export default Loading;
