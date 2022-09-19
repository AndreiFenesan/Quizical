import React from "react";
import "./difficultyComboBox.css"

export default function DifficultyComboBox(props: { value: string, onChange: (event:React.ChangeEvent<HTMLSelectElement>) => void }) {
    const options =["Easy", "Medium", "Hard"];//levels of difficulty
    return(
        <label className={"gameSettings--label"}>Choose difficulty
            <select
                name={"difficulty"}
                className={"select"}
                value={props.value}
                onChange={props.onChange}
            >
                {options.map(option => <option>{option}</option>)}
            </select>
        </label>)
}