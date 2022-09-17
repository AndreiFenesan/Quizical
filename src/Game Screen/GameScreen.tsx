import React from "react";
import './gameScreen.css'
import Question from "../Question/Question";
import {QuestionModel} from "../Question/questionModel";
import AnswersCounter from "../Correct answers counter/AnswersCounter";

interface GameScreenProps {
    allQuestions:QuestionModel[]
    newGameHandler: () => void//function which generates another game
}
function GameScreen ({allQuestions,newGameHandler}:GameScreenProps) : JSX.Element {

    const [isCheckAnswerButtonPressed,setIsCheckAnswerButtonPressed] = React.useState(false);

    const numberOfQuestions = allQuestions.length;

    let correctAnswersArray= React.useRef<boolean[]>(Array(numberOfQuestions).fill(false)); //We want to persist the array between renders


    function setIsCorrectAnswerSelectedForQuestionId(questionId: number, value:boolean) :void {
        //sets the value(true or false) for the question with th id questionId.
        //true means that the current selected answer is the correct answer.
        //false means that the current selected answer is one of the incorrect answers.
        correctAnswersArray.current[questionId] = value;
    }

    function getNumberOfCorrectSelectedAnswers(correctAnswersArr:boolean[]) :number {
        //returns the number of correct selected answers
        let numberOfCorrectSelectedAnswers = 0;
        for(let i=0;i<correctAnswersArr.length;i++) {
            if(correctAnswersArr[i] === true)
                numberOfCorrectSelectedAnswers++;
        }
        return numberOfCorrectSelectedAnswers;
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

    const checkAnswerElement = <input
        type={"button"}
        value={"Check answers"}
        className={"check--answers--button"}
        onClick={() => setIsCheckAnswerButtonPressed(true)}
    />

    const newGameButtonElement = <input
        type={"button"}
        value={"New game"}
        className={"check--answers--button"}
        onClick={() => newGameHandler()}
    />
    return(
        <div className={"gameScreen--container"}>
            {allQuestionElements}
            <div className={"checkButton--counter--container"}>
                {isCheckAnswerButtonPressed ? newGameButtonElement : checkAnswerElement}
                {
                    isCheckAnswerButtonPressed &&
                    <AnswersCounter
                        totalNumberOfAnswers={numberOfQuestions}
                        correctSelectedAnswers={getNumberOfCorrectSelectedAnswers(correctAnswersArray.current)}
                    />
                }
            </div>
        </div>
        )
}
export default GameScreen;
