import styled, { keyframes, css } from "styled-components";
import { useState, useEffect } from "react";

const move_topleft = keyframes`
  50% {
    top: 150px;
    left: 150px;
  }
`;

const move_translate = keyframes`
  50% {
    /* transform: translate(150px, 150px); */
    transform: scale(0.5)
  }
`;

function MobilegamePage() {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setFlag(true);
    }, 1000);
  }, []);
  return (
    <Container>
      <CC>
        <AA flag={flag}></AA>
      </CC>
    </Container>
  );
}

const Container = styled.div``;
const CC = styled.div`
  /* position: relative; */
  width: 300px;
  text-align: center;
`;

const AA = styled.div<{ flag: boolean }>`
  /* position: absolute; */
  position: relative;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: red;
  &:hover {
    /* transform: translate(150px, 150px);
    transition: transform 3s; */
    /* top: 150px;
    left: 150px;
    transition: all 3s; */
    animation: ${move_translate} 3s ease infinite;
  }

  /* ${(props) =>
    props.flag &&
    css`
      animation: ${move_translate} 3s ease infinite;
    `} */
`;

export default MobilegamePage;
