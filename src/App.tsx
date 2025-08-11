import { useState } from 'react'
import './App.css'
const jokesApiBase = "https://v2.jokeapi.dev/joke/Any?safe-mode";

const options = {
  method: 'GET', // Explicitly setting the method, though 'GET' is default
  headers: {
    'Content-Type': 'application/json', // Example: Content-Type header
  }
};

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

  return (
    <>
      <div>
        <img src="/congrationYouDoneIt.png" className="logo" alt="Vite logo" />
      </div>
      <h1>Flock of Jokes</h1>

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
