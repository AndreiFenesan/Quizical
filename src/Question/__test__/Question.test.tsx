import React from "react";
import ReactDOM from "react-dom";
import Question from "../Question";
import {isTSAnyKeyword} from "@babel/types";
import {render, screen, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom"

afterEach(cleanup);
it("renders without crashing", () => {
    const questionProp={
        questionId:0,
        question:"Question1?",
        correctAnswer:"Answer3",
        allAnswers:["Answer0","Answer1","Answer2","Answer3"],
        isCheckAnswerButtonPressed:false,
        setIsCorrectAnswerSelectedForQuestionId:jest.fn(),
    };
    const div = document.createElement("div");
    ReactDOM.render(<Question questionId={questionProp.questionId}
                              question={questionProp.question}
                              correctAnswer={questionProp.correctAnswer}
                              allAnswers={questionProp.allAnswers}
                              setIsCorrectAnswerSelectedForQuestionId={questionProp.setIsCorrectAnswerSelectedForQuestionId}
                              isCheckAnswerButtonPressed={questionProp.isCheckAnswerButtonPressed}/>,div);
});

it("at the beginning all answers have the default className \"answer--button\" (isCheckAnswerButtonPressed is false and no answer is pressed)",() =>{
    const questionProp={
        questionId:0,
        question:"Question1?",
        correctAnswer:"Answer3",
        allAnswers:["Answer0","Answer1","Answer2","Answer3"],
        isCheckAnswerButtonPressed:false,
        setIsCorrectAnswerSelectedForQuestionId:jest.fn(),
    };
    render(
        <Question questionId={questionProp.questionId}
                  question={questionProp.question}
                  correctAnswer={questionProp.correctAnswer}
                  allAnswers={questionProp.allAnswers}
                  setIsCorrectAnswerSelectedForQuestionId={questionProp.setIsCorrectAnswerSelectedForQuestionId}
                  isCheckAnswerButtonPressed={questionProp.isCheckAnswerButtonPressed}
        />
    );
    const allAnswersElements = screen.getAllByText(/answer/i);
    expect(allAnswersElements.length).toBe(4);
    expect(allAnswersElements.every(answer => answer.className === "answer--button")).toBe(true);
});

it("change className of the clicked answer (new class name should be \"answer--button answer--button--color\") when " +
    "isCheckAnswerButtonPressed is false", ()=> {
    const questionProp={
        questionId:0,
        question:"Question1?",
        correctAnswer:"Answer1",
        allAnswers:["Answer0","Answer1","Answer2","Answer3"],
        isCheckAnswerButtonPressed:false,
        setIsCorrectAnswerSelectedForQuestionId:jest.fn(),
    };
    render(
        <Question questionId={questionProp.questionId}
                  question={questionProp.question}
                  correctAnswer={questionProp.correctAnswer}
                  allAnswers={questionProp.allAnswers}
                  setIsCorrectAnswerSelectedForQuestionId={questionProp.setIsCorrectAnswerSelectedForQuestionId}
                  isCheckAnswerButtonPressed={questionProp.isCheckAnswerButtonPressed}
        />
    );
    const answer3=screen.getByText(/answer3/i);
    //fire event of answer3
    fireEvent.click(answer3);
    expect(answer3.className==="answer--button answer--button--color").toBe(true);
    //all the other questions should have className "answer--button"
    const answersExceptAnswer3 = screen.getAllByText(/answer[012]/i);
    expect(answersExceptAnswer3.length).toBe(3);
    expect(answersExceptAnswer3.every(answer => answer.className==="answer--button")).toBe(true);
});

it("change className of the last clicked answer (new class name should be \"answer--button green--background--color\") when " +
    "the last clicked answer is the correct answer and isCheckAnswerButtonPressed is true",() =>{
    const questionProp={
        questionId:0,
        question:"Question1?",
        correctAnswer:"Answer3",
        allAnswers:["Answer0","Answer1","Answer2","Answer3"],
        isCheckAnswerButtonPressed:true,
        setIsCorrectAnswerSelectedForQuestionId:jest.fn(),
    };
    render(
        <Question questionId={questionProp.questionId}
                  question={questionProp.question}
                  correctAnswer={questionProp.correctAnswer}
                  allAnswers={questionProp.allAnswers}
                  setIsCorrectAnswerSelectedForQuestionId={questionProp.setIsCorrectAnswerSelectedForQuestionId}
                  isCheckAnswerButtonPressed={questionProp.isCheckAnswerButtonPressed}
        />
    );
    const answer3 = screen.getByText(/answer3/i);//select the correct answer
    expect(answer3.className).toBe("answer--button green--background--color");
    const answersExceptAnswer3 = screen.getAllByText(/answer[012]/i);//select the incorrect answers
    expect(answersExceptAnswer3.length).toBe(3);
    expect(answersExceptAnswer3.every(answer => answer.className === "answer--button check--answers--opacity")).toBe(true);//incorrect answers should be marked
});






