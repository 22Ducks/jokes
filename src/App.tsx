import { useState } from 'react'
import './App.css'
const jokesApiBase = "https://v2.jokeapi.dev/joke/Any?safe-mode";

const options = {
  method: 'GET', // Explicitly setting the method, though 'GET' is default
  headers: {
    'Content-Type': 'application/json', // Example: Content-Type header
  }
};

function App() {

  const [joke, setJoke] = useState("");

  const getJoke = async () => {
    try {
      const response = await fetch(jokesApiBase, options);
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      console.log({ result} );

      const { joke, setup, delivery } = result;
      if(joke) {
        setJoke(joke);
      } else {
        setJoke(`${setup} ${delivery}`);
      }

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
        <p>{joke}</p>
      </div>
    </>
  )
}

export default App;
