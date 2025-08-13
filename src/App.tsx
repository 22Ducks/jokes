import { useState, useEffect } from 'react'
import './App.css'
import { getCats } from './getCats';
import { jokesApiBase, options, safeMode } from './constants';
import { getJoke } from './getJoke';


// const jokeCats = {
//   Misc: true,
//   Programming: true,
//   Pun: true,
//   Spooky: true
// }

type Categories = Record<string, boolean>;

type Joke = {
  joke?: string;
  setup?: string;
  delivery?: string;
}

function App() {

  const [joke, setJoke] = useState<Joke>({});
  const [categories, setCategories] = useState<Categories>({});

  useEffect(() => {
    getCats(setCategories);
  }, []);

  const catList = Object.keys(categories).reduce((acc, curr) => {
    return categories[curr] ? [...acc, curr] : acc;
  }, [] as Array<string>).join(",") || "Any";

  const onChange = (cat: string) => {
    setCategories({
      ...categories,
      [cat]: !categories[cat]
    });
  }

  return (
    <>
      <div>
        <img src="/congrationYouDoneIt.png" className="logo" alt="Vite logo" />
      </div>
      <h1>Flock of Jokes</h1>

      <fieldset>
        <legend>Select desired joke categories:</legend>

          {
            Object.entries(categories).map(([cat, checked]) => 
              <div>
                <input type="checkbox" name={cat} checked={checked} onChange={() => onChange(cat)}/>
                <label htmlFor={cat}>{cat}</label>
              </div>
            )
          }
      </fieldset>

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
