import { styled } from "styled-components";
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

    const Toggler = styled.div `
        border-bottom: 1px solid black;
    `;

    const CatBox = styled.fieldset `
        border: 3px solid black;
        width: 350px;
    `;

    const StyledLegend = styled.legend `
        text-align: center;
        width: auto;
        margin-left: auto;
        margin-right: auto;
    `;

    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Select desired joke categories:</FormLabel>

            { Object.keys(categories).length > 0 ? (
                <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox checked={toggleChecked} onChange={toggleAll}/>
                        }
                        label="Toggle All"
                    />

                    {
                        Object.entries(categories).map(([cat, checked]) => 
                            // <div key={cat}>
                            //     <input type="checkbox" name={cat} checked={checked} onChange={() => onChange(cat)}/>
                            //     <label htmlFor={cat}>{cat}</label>
                            // </div>

                            <FormControlLabel
                                key={cat}
                                control={
                                <Checkbox checked={checked} onChange={() => onChange(cat)}/>
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
