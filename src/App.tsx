import { useState } from 'react'
import './App.css'
const jokesApiBase = "https://v2.jokeapi.dev/joke/Any?safe-mode";

const options = {
  method: 'GET', // Explicitly setting the method, though 'GET' is default
  headers: {
    'Content-Type': 'application/json', // Example: Content-Type header
  }
};

const jokeCats = {
  Any: false,
  Misc: true,
  Programming: true,
  Pun: true,
  Spooky: true
}

type Joke = {
  joke?: string;
  setup?: string;
  delivery?: string;
}

function App() {

  const [joke, setJoke] = useState<Joke>({});

  const getJoke = async () => {
    try {
      const response = await fetch(jokesApiBase, options);
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
            Object.entries(jokeCats).map(([cat, checked]) => 
              <div>
                <input type="checkbox" name={cat} checked={checked} onChange={e => console.log(e)}/>
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
