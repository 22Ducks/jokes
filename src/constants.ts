export const jokesApiBase = "https://v2.jokeapi.dev/joke/";
export const safeMode = "?safe-mode";

export const options = {
  method: 'GET', // Explicitly setting the method, though 'GET' is default
  headers: {
    'Content-Type': 'application/json', // Example: Content-Type header
  }
};