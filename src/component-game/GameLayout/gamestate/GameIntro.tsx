import styled from "styled-components";

interface GameIntroProps {
  title: string;
  creator: {
    thumbnail: string;
    name: string;
  };
  enterToPlaying: () => void;
  children: React.ReactNode;
}

function GameIntro(props: GameIntroProps) {
  const { title, creator, enterToPlaying, children } = props;

  return (
    <Container>
      <Title>{title}</Title>
      {children}
      <PlayButton onClick={enterToPlaying}>PLAY</PlayButton>
      <Creator>created by {creator.name}</Creator>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  margin-bottom: 15px;
  font-size: 30px;
`;

const PlayButton = styled.button`
  padding: 10px 20px 10px 20px;
  font-size: 22px;
  background: white;
  border-radius: 10px;
`;

const Creator = styled.div`
  position: absolute;
  bottom: 10%;
`;

export default GameIntro;
