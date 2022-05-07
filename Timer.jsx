import React from "react";
import styled from "styled-components";
import { Icon } from "styleVariables";

import clockURL from "assets/images/clock.png";

const Timer = ({ timeElapsed }) => (
  <>
    <Container>
      <Start timeElapsed={timeElapsed}>Start</Start>
      {timeElapsed === 0 ? (
        <span>Ready</span>
      ) : (
        <>
          <Icon
            style={{ margin: "6px 7px 0 0" }}
            size={24}
            src={clockURL}
            alt="1to50"
          />
          <Front>{Math.floor(timeElapsed / 1000)}.</Front>
          <Back>{(timeElapsed % 1000) / 10}</Back>
        </>
      )}
    </Container>
  </>
);

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 2em;
  font-weight: 900;
  margin-top: 40px;
  margin-bottom: 10px;
  /* border: 1px solid black; */
`;

const Start = styled.div`
  position: absolute;
  display: ${(props) => (props.timeElapsed === 0 ? "none" : "flex")};
  font-size: 30px;
  animation: start 0.2s;
  animation-fill-mode: forwards;
  @keyframes start {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1);
    }
    40% {
      transform: scale(2);
    }
    60% {
      transform: scale(3);
    }
    80% {
      transform: scale(4);
    }
    99% {
      transform: scale(5);
    }
    100% {
      transform: scale(0);
    }
  }
`;

const Front = styled.div`
  text-align: right;
  /* width: 3em; */
`;

const Back = styled.div`
  width: 1em;
`;

export default Timer;
