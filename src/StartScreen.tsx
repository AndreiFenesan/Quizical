import React from "react";
import './StartScreen.css';

const StartScreen : React.FC = (props:object) : JSX.Element =>   {
    return (
        <div className={"startScreen--container"}>
            <h1 className={"game--title"}>Quizius</h1>
            <p className={"game--description"}>Answer all questions</p>
            <input type={"button"} className={"start--quiz--button"} value={"Start quiz"}/>
        </div>
    );
}

export default StartScreen;