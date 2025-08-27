import { useState, useEffect } from 'react'
import './App.css'
import { getCats } from './getCats';
import { getJoke } from './getJoke';
import type { Categories, Joke } from './types';
import { CatSelection } from './CatSelection';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const Container = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.img `
  height: 100px;
`;

const Overlay = styled.div<{ busy: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: ${({ busy }) => busy ? "block" : "none"};
  cursor: wait;
`;

function App() {

  const [joke, setJoke] = useState<Joke>({});
  const [categories, setCategories] = useState<Categories>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getCats(setCategories);
  }, []);

  const getJokeDisabled = Object.keys(categories).length === 0;

  const catList = Object.keys(categories).reduce((acc, curr) => {
    return categories[curr] ? [...acc, curr] : acc;
  }, [] as Array<string>).join(",") || "Any";

  const onClick = async () => {
    setBusy(true);
    await getJoke(catList, setJoke);
    setBusy(false);
  }

  const JokeText = styled.div ``;

  return (
    <Container>
      <Overlay busy={busy}/>

      <Logo src="/congrationYouDoneIt.png" />
      <h1>Flock of Jokes</h1>

      <CatSelection categories={categories} setCategories={setCategories} />

      <div>
        <Button variant="outlined" onClick={onClick} disabled={getJokeDisabled}>Get Joke</Button>
      </div>

      <JokeText>
        { joke.joke && <p>{joke.joke}</p> }
        { joke.setup && <p>{joke.setup}</p> }
        { joke.delivery && <p>{joke.delivery}</p> }
      </JokeText>
    </Container>
  )
}

export default App;
