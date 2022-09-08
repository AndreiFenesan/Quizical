import React from "react";
import './gameScreen.css'
import Question from "./Question";
import {QuestionModel} from "./questionModel";

interface GameScreenProps {
    allQuestions:QuestionModel[]
}
function GameScreen ({allQuestions}:GameScreenProps) : JSX.Element {
    const allQuestionElements = allQuestions.map(questionModel => (
        <Question
            key={questionModel.question}
            questionId={questionModel.questionId}
            question={questionModel.question}
            correctAnswer={questionModel.correctAnswer}
            allAnswers={questionModel.allAnswers}
        />
    ))
    return(
        <div className={"gameScreen--container"}>
            {allQuestionElements}
        </div>
        )
}
export default GameScreen;
