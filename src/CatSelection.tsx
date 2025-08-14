import type { Categories } from "./types";

type Props = {
    categories: Categories;
    setCategories: (cat: Categories) => void;
};

export const CatSelection = ({ categories, setCategories }: Props) => {

    const toggleChecked = Object.values(categories).every(cat => cat);
    
    const onChange = (cat: string) => {
        setCategories({
            ...categories,
            [cat]: !categories[cat]
        });
    }

    const toggleAll = () => {
        const newCats = Object.keys(categories).reduce((acc, curr) => {
            return {...acc, [curr]: !toggleChecked}
        }, {} as Categories);

        setCategories(newCats);
    }

    return (
        <fieldset>
            <legend>Select desired joke categories:</legend>

            <div className="toggler">
                <input type="checkbox" name="toggle" checked={toggleChecked} onChange={toggleAll}/>
                <label htmlFor="toggle">Toggle All</label>
            </div>

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