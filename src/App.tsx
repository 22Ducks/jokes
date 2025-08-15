import { useState, useEffect } from 'react'
import './App.css'
import { getCats } from './getCats';
import { getJoke } from './getJoke';
import type { Categories, Joke } from './types';
import { CatSelection } from './CatSelection';

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

  return (
    <>
      <div className={"overlay" + (busy ? " busy" : "")} />

      <div>
        <img src="/congrationYouDoneIt.png" className="logo" alt="Vite logo" />
      </div>
      <h1>Flock of Jokes</h1>

      <CatSelection categories={categories} setCategories={setCategories} />

      <div className="card">
        <button onClick={onClick} disabled={getJokeDisabled}>Get Joke</button>
      </div>

      <div>
        { joke.joke && <p>{joke.joke}</p> }
        { joke.setup && <p>{joke.setup}</p> }
        { joke.delivery && <p>{joke.delivery}</p> }
      </div>
    </>
  )
}

export default App;
