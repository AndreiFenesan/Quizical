import React from "react";
import "./answers counter.css";
interface AnswerCounterProps{
    correctSelectedAnswers:number
    totalNumberOfAnswers:number
}
export default function AnswersCounter({correctSelectedAnswers,totalNumberOfAnswers}:AnswerCounterProps):JSX.Element {

    return (
        <div className={"counter"}>
            <h1>{correctSelectedAnswers}/{totalNumberOfAnswers}</h1>
        </div>
    )
}