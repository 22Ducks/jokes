import type { Categories } from "./types";

type Props = {
    categories: Categories;
    setCategories: (cat: Categories) => void;
};

export const CatSelection = ({ categories, setCategories }: Props) => {
    const onChange = (cat: string) => {
        setCategories({
            ...categories,
            [cat]: !categories[cat]
        });
    }

    return (
        <fieldset>
            <legend>Select desired joke categories:</legend>

            {
                Object.entries(categories).map(([cat, checked]) => 
                    <div key={cat}>
                        <input type="checkbox" name={cat} checked={checked} onChange={() => onChange(cat)}/>
                        <label htmlFor={cat}>{cat}</label>
                    </div>
                )
            }
        </fieldset>
    );
}