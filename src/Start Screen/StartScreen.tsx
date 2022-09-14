import React from "react";
import './StartScreen.css';
interface StartScreenProps {
    startButtonClickHandler: () => void// button click handler
    selectOnChange: (value:string) =>void
    difficulty:string
}

const StartScreen : React.FC<StartScreenProps> = ({startButtonClickHandler,difficulty,selectOnChange}) : JSX.Element =>   {

    return (
        <div className={"startScreen--container"}>
            <h1 className={"game--title"}>Quizius</h1>
            <p className={"game--description"}>Answer all questions</p>
            <select
                className={"select"}
                value={difficulty}
                onChange={(event) => selectOnChange(event.target.value)}
            >
                <option value={"Easy"}>Easy</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Hard"}>Hard</option>
            </select>
            <input type={"button"} className={"start--quiz--button"} value={"Start quiz"} onClick={startButtonClickHandler}/>
        </div>
    );
}

export default StartScreen;