import React from "react";
import "./numberOfQuestions.css"

export default function NumberOfQuestionsSpinBox(props: { value: number, onChange: (event:React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <label className={"gameSettings--label"}>Choose number <br/> of questions
            <input
                name={"numberOfQuestions"}
                value={props.value}
                onChange={props.onChange}
                className={"spinBox"}
                type={"number"}
            />
        </label>)
}