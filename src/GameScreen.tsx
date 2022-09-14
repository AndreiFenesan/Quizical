import React from "react";
import './gameScreen.css'
import Question from "./Question";
import {QuestionModel} from "./questionModel";

interface GameScreenProps {
    allQuestions:QuestionModel[]
}
function GameScreen ({allQuestions}:GameScreenProps) : JSX.Element {

    const [isCheckAnswerButtonPressed,setIsCheckAnswerButtonPressed] = React.useState(false);

    const numberOfQuestions = allQuestions.length;
    let correctAnswersArray= Array(numberOfQuestions).fill(false);

    function setIsCorrectAnswerSelectedForQuestionId(questionId: number, value:boolean) :void {
        //sets the value(true or false) for the question with th id questionId.
        //true means that the current selected answer is the correct answer.
        //false means that the current selected answer is one of the incorrect answers.
        correctAnswersArray[questionId] = value;
    }
    
    const allQuestionElements = allQuestions.map(questionModel => (
        <Question
            key={questionModel.question}
            questionId={questionModel.questionId}
            question={questionModel.question}
            correctAnswer={questionModel.correctAnswer}
            allAnswers={questionModel.allAnswers}
            setIsCorrectAnswerSelectedForQuestionId={setIsCorrectAnswerSelectedForQuestionId}
            isCheckAnswerButtonPressed={isCheckAnswerButtonPressed}
        />
    ))
    return(
        <div className={"gameScreen--container"}>
            {allQuestionElements}
            <input
                type={"button"}
                value={"Check answers"}
                className={"check--answers--button"}
                onClick={() => setIsCheckAnswerButtonPressed(true)}
            />
        </div>
        )
}
export default GameScreen;
