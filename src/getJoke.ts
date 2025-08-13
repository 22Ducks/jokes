import { jokesApiBase, options, safeMode } from "./constants";
import type { Joke } from "./types";

export const getJoke = async (catList: string, setJoke: (j: Joke) => void) => {
    const jokeUrl = jokesApiBase + catList + safeMode;

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