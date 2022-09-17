import React from "react";
import './StartScreen.css';
interface StartScreenProps {
    startButtonClickHandler: () => void// button click handler
    gameSettingOnChange: (event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    gameSettings:{difficulty:string, numberOfQuestions:number}
}

const StartScreen : React.FC<StartScreenProps> = ({startButtonClickHandler,gameSettings,gameSettingOnChange}) : JSX.Element =>   {

    const selectDifficultyComboBox =
        <select
        name={"difficulty"}
        className={"select"}
        value={gameSettings.difficulty}
        onChange={(event) => gameSettingOnChange(event)}
    >
        <option value={"Easy"}>Easy</option>
        <option value={"Medium"}>Medium</option>
        <option value={"Hard"}>Hard</option>
    </select>

    const chooseNumberOfQuestionsElement =
        <input
        name={"numberOfQuestions"}
        value={gameSettings.numberOfQuestions}
        onChange={event => gameSettingOnChange(event)}
        className={"spinBox"}
        type={"number"}
    />

    return (
        <div className={"startScreen--container"}>
            <h1 className={"game--title"}>Quizius</h1>
            <p className={"game--description"}>Answer all questions</p>
            {selectDifficultyComboBox}
            {chooseNumberOfQuestionsElement}
            <input type={"button"} className={"start--quiz--button"} value={"Start quiz"} onClick={startButtonClickHandler}/>
        </div>
    );
}

export default StartScreen;