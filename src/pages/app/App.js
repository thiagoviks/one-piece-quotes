import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import luffyImg from '../../images/luffy.png';
import gomuGomu from '../../sounds/gomu-gomu.mp3';
import { Quotes } from '../../components';
import { getQuote } from '../../services';

const audio = new Audio(gomuGomu);

export function App() {
  const isMounted = useRef(true);
  const [quote, setQuote] = useState({
    speaker: 'Loading speaker...',
    quote: 'Loading Quote',
  });

  const onUpdate = async () => {
    const resQuote = await getQuote();

    if (isMounted.current) {
      setQuote(resQuote);
      audio.play();
    }
  };

  useEffect(() => {
    onUpdate();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Content>
      <Quotes {...quote} onUpdate={onUpdate} />
      <OnePieceImg alt='One Piece' src={luffyImg} />
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const OnePieceImg = styled.img`
  max-width: 30vw;
  align-self: flex-end;
`;
