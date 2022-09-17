import React from "react";
import './question.css';
import Answer from "./Answer/Answer";
const he =require("he");

interface QuestionProps {
    questionId:number
    question: string
    correctAnswer: string
    allAnswers:string[]
    setIsCorrectAnswerSelectedForQuestionId: (index:number, value:boolean) => void //function which set if the selected answer is correct of not
    isCheckAnswerButtonPressed:boolean
}

const Question = ({questionId,question,correctAnswer,allAnswers,setIsCorrectAnswerSelectedForQuestionId,isCheckAnswerButtonPressed}:QuestionProps):JSX.Element => {
    const [lastClickedAnswerId,setLastClickedAnswerId] = React.useState<number>(-1)//-1 means that no answer were selected

    function getClassName(answerId:number):string {
        let className = "answer--button";
        const answerValue:string=allAnswers[answerId];
        if(isCheckAnswerButtonPressed)
        {
            if(answerValue === correctAnswer) {
                //highlight the correct answer (making it green)
                className += " green--background--color";
                return className;
            }
            else if(lastClickedAnswerId === answerId){
                //wrong answer was selected. Highlight the wrong answer (making it red)
                className += " red--background--color";
            }
            className += " check--answers--opacity";
            return className;

        }
        return answerId!== lastClickedAnswerId? "answer--button" : "answer--button answer--button--color";
    }

    function answerButtonClickHandler(buttonId:number):void {
        setIsCorrectAnswerSelectedForQuestionId(questionId, allAnswers[buttonId] === correctAnswer);
        setLastClickedAnswerId(buttonId);
    }

    const answersElements = allAnswers.map((answer,answerId) =>{
        return(
        <Answer key={answer} answerId={answerId} className={getClassName(answerId)}
                onClick={() => answerButtonClickHandler(answerId)} answer={answer}/>
        )});

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
