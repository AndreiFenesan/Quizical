import React from "react";
import './StartScreen.css';
interface StartScreenProps {
    startButtonClickHandler: () => void// button click handler
}

const StartScreen : React.FC<StartScreenProps> = ({startButtonClickHandler}) : JSX.Element =>   {
    return (
        <div className={"startScreen--container"}>
            <h1 className={"game--title"}>Quizius</h1>
            <p className={"game--description"}>Answer all questions</p>
            <input type={"button"} className={"start--quiz--button"} value={"Start quiz"} onClick={startButtonClickHandler }/>
        </div>
    );
}

export default StartScreen;