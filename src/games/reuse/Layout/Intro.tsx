import styled from "styled-components";

interface IntroType {
  title: string;
  creator: {
    thumbnail: string;
    name: string;
  };
}

function Intro(props: IntroType) {
  const { title, creator } = props;
  return (
    <Container>
      <Title>{title}</Title>
      <PlayButton>PLAY</PlayButton>
      <Creator>created by {creator.name}</Creator>
    </Container>
  );
}

const Container = styled.div`
  grid-area: game;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab) 0 0/300%
    300%;
`;

const Title = styled.div`
  font-size: 30px;
  margin-bottom: 30px;
`;

const PlayButton = styled.button`
  padding: 10px 20px 10px 20px;
  font-size: 22px;
  background: white;
  border-radius: 10px;
`;

const Creator = styled.div`
  position: absolute;
  bottom: 5%;
`;

export default Intro;
