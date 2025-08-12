import { useState, useEffect } from 'react'
import './App.css'
const jokesApiBase = "https://v2.jokeapi.dev/joke/";
const safeMode = "?safe-mode";

const options = {
  method: 'GET', // Explicitly setting the method, though 'GET' is default
  headers: {
    'Content-Type': 'application/json', // Example: Content-Type header
  }
};

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
    const getCats = async () => {
      const response = await fetch("https://v2.jokeapi.dev/categories", options);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      const jokeCats = (result.categories as string[]).reduce((acc, curr) => {
        return curr === "Any" ? acc : {...acc, [curr]: false};
      }, {} as Categories);

      setCategories(jokeCats);
    }

    getCats();
  }, []);

  const catList = Object.keys(categories).reduce((acc, curr) => {
    return categories[curr] ? [...acc, curr] : acc;
  }, [] as Array<string>).join(",") || "Any";

  const jokeUrl = jokesApiBase + catList + safeMode;

  const getJoke = async () => {
    try {
      const response = await fetch(jokeUrl, options);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      const { joke, setup, delivery } = result;
      setJoke({ joke, setup, delivery });

    } catch (error) {
      console.error("Caught an unknown error.");
    }
  }

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
        <button onClick={getJoke}>Get Joke</button>
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
