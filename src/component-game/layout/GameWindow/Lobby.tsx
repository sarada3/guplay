import styled from "styled-components";

function Lobby() {
  return <Container>Lobby</Container>;
}

const Container = styled.div`
  grid-area: lobby;
  background-color: pink;
  @media ${(props) => props.theme.device.UPTO_TABLET} {
    grid-area: lobby_game_ranking;
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
  }
`;

export default Lobby;
