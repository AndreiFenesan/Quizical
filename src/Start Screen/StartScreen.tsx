import React from "react";
import './StartScreen.css';
import DifficultyComboBox from "./difficultyComboBox/DifficultyComboBox";
import NumberOfQuestionsSpinBox from "./numberOfQuestions/NumberOfQuestionsSpinBox";

interface StartScreenProps {
    startButtonClickHandler: () => void// button click handler
    gameSettingOnChange: (event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    gameSettings:{difficulty:string, numberOfQuestions:number}
}




const StartScreen : React.FC<StartScreenProps> = ({startButtonClickHandler,gameSettings,gameSettingOnChange}) : JSX.Element =>   {

    const selectDifficultyComboBox =
        <DifficultyComboBox value={gameSettings.difficulty} onChange={event => gameSettingOnChange(event)}/>

    const chooseNumberOfQuestionsElement =
        <NumberOfQuestionsSpinBox value={gameSettings.numberOfQuestions}
                                  onChange={event => gameSettingOnChange(event)}/>

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