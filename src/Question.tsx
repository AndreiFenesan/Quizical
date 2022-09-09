import React from "react";
import './question.css';
const he =require("he");

interface QuestionProps {
    questionId:number
    question: string
    correctAnswer: string
    allAnswers:string[]
    setIsCorrectAnswerSelectedForQuestionId: (index:number, value:boolean) => void //function which set if the selected answer is correct of not
}

const Question = ({questionId,question,correctAnswer,allAnswers,setIsCorrectAnswerSelectedForQuestionId}:QuestionProps):JSX.Element => {
    const [lastClickedAnswerId,setLastClickedAnswerId] = React.useState<number>(-1)//-1 means that no answer were selected

    function answerButtonClickHandler(buttonId:number):void {
        setIsCorrectAnswerSelectedForQuestionId(questionId, allAnswers[buttonId] === correctAnswer? true : false);
        setLastClickedAnswerId(buttonId);
    }

    const answersElements = allAnswers.map((answer,answerId) =>{
        return(
        <input
            id={`${answerId}`}
            type={"button"}
            key={answer}
            className={answerId!== lastClickedAnswerId? "answer--button" : "answer--button answer--button--color"}
            onClick={() => answerButtonClickHandler(answerId)}
            value={he.decode(answer)}//must decode de answer because it contains html entities
        />
        )})

    return (
        <React.Fragment>
        <div className={"question--container"}>
            <h3 className={"question--text"}  >{he.decode(question)}</h3>
            <div className={"answers--container"}>
                {answersElements}
            </div>
        </div>
            <hr className={"delimiter"}/>
        </React.Fragment>
    )
}
export default Question;
