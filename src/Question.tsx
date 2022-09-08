import React from "react";
import './question.css';
const he =require("he");

interface QuestionProps {
    questionId:number
    question: string
    correctAnswer: string
    allAnswers:string[]
}

const Question = ({question,correctAnswer,allAnswers}:QuestionProps):JSX.Element => {
    const [lastClickedAnswerId,setLastClickedAnswerId] = React.useState<number>(-1)//-1 means that no answer were selected

    function buttonClickHandler(buttonId:number):void {
        setLastClickedAnswerId(buttonId);
    }

    const answersElements = allAnswers.map((answer,index) =>{
        return(
        <input
            id={`${index}`}
            type={"button"}
            key={answer}
            className={index!== lastClickedAnswerId? "answer--button" : "answer--button answer--button--color"}
            onClick={() => buttonClickHandler(index)}
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
