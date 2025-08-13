import { options } from "./constants";
import type { Categories } from "./types";

export const getCats = async (setCategories: (cat: Categories) => void) => {
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