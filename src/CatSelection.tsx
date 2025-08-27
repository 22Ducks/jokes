import type { Categories } from "./types";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormGroup } from "@mui/material";

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
        <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Select desired joke categories:</FormLabel>

            { Object.keys(categories).length > 0 ? (
                <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox sx={{ p: 0.25 }} checked={toggleChecked} onChange={toggleAll}/>
                        }
                        label="Toggle All"
                    />

                    {
                        Object.entries(categories).map(([cat, checked]) => 
                            <FormControlLabel
                                key={cat}
                                control={
                                <Checkbox sx={{ p: 0.25 }} checked={checked} onChange={() => onChange(cat)}/>
                                }
                                label={cat}
                            />
                        )
                    }
                </FormGroup>) : (
                    <img src="/loading.gif" width="150px"/>
                )
            }
        </FormControl>
    );
}
