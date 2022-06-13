import styled from "styled-components";
import React from "react";

interface GameLayoutLobbyProps {
  mobileOpen: boolean;
  closeMobileRoutes: () => void;
}

function GameLayoutLobby(props: GameLayoutLobbyProps) {
  const { mobileOpen, closeMobileRoutes } = props;
  return (
    <LobbyContainer mobileOpen={mobileOpen}>
      <LobbyInnerContainer>
        <LobbyMobileCloseButton onClick={closeMobileRoutes}>
          {"<"}
        </LobbyMobileCloseButton>
        Lobby
      </LobbyInnerContainer>
    </LobbyContainer>
  );
}

export const LobbyContainer = styled.div<{ mobileOpen: boolean }>`
  grid-area: lobby;
  z-index: 1;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    grid-area: lobby_game_ranking;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: flex-start;
    transition: transform 0.3s;
    transform: ${(props) =>
      props.mobileOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

export const LobbyInnerContainer = styled.div`
  position: relative;
  padding-top: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: pink;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    width: 80%;
  }
`;

export const LobbyMobileCloseButton = styled.button`
  display: none;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    display: block;
    position: absolute;
    top: 0;
    right: -20px;
    width: 20px;
    height: 40px;
    font-weight: 600;
  }
`;

export default React.memo(GameLayoutLobby);
