import { useState, useEffect } from 'react'
import './App.css'
import { getCats } from './getCats';
import { getJoke } from './getJoke';
import type { Categories, Joke } from './types';
import { CatSelection } from './CatSelection';

function App() {

  const [joke, setJoke] = useState<Joke>({});
  const [categories, setCategories] = useState<Categories>({});

  useEffect(() => {
    getCats(setCategories);
  }, []);

  const catList = Object.keys(categories).reduce((acc, curr) => {
    return categories[curr] ? [...acc, curr] : acc;
  }, [] as Array<string>).join(",") || "Any";

  return (
    <>
      <div>
        <img src="/congrationYouDoneIt.png" className="logo" alt="Vite logo" />
      </div>
      <h1>Flock of Jokes</h1>

      <CatSelection categories={categories} setCategories={setCategories} />

      <div className="card">
        <button onClick={() => getJoke(catList, setJoke)}>Get Joke</button>
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
