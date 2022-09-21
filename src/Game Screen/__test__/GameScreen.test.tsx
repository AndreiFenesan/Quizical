import React from "react";
import GameScreen from "../GameScreen";
import {cleanup, fireEvent, render, screen} from "@testing-library/react";
import {QuestionModel} from "../../Question/questionModel";
import "@testing-library/jest-dom";


afterEach(cleanup);

it("renders without crashing",()=>{
    const questions:QuestionModel[]=[
        {
            questionId:0,
            question:"Q0",
            allAnswers:["Q0A0","Q0A1","Q0A2","Q0A3"],
            correctAnswer:"Q0A2",
        },
        {
            questionId:1,
            question:"Q1",
            allAnswers:["Q1A0","Q1A1","Q1A2","Q1A3"],
            correctAnswer:"Q1A1",
        }

    ]
    render(<GameScreen allQuestions={questions} newGameHandler={jest.fn}/>);
    const answer3Question0 = screen.getByText(/q1a3/i);
    expect(answer3Question0).toBeInTheDocument();
});

it("changes the className of the selected (incorrect) answer after the check answers button is pressed",()=>{
    const questions:QuestionModel[]=[
        {
            questionId:0,
            question:"Q0",
            allAnswers:["Q0A0","Q0A1","Q0A2","Q0A3"],
            correctAnswer:"Q0A2",
        },
        {
            questionId:1,
            question:"Q1",
            allAnswers:["Q1A0","Q1A1","Q1A2","Q1A3"],
            correctAnswer:"Q1A1",
        }

    ];
    render(<GameScreen allQuestions={questions} newGameHandler={jest.fn}/>);
    //select an incorrect answer for question 0
    const question0Answer3 = screen.getByText(/q0a3/i);//incorrect answer
    fireEvent.click(question0Answer3);
    //select the correct answer for question 1
    const question1Answer1 = screen.getByText(/q1a1/i);//correct answer;
    fireEvent.click(question1Answer1);
    //press checkAnswers button
    const checkAnswersButton = screen.getByText(/check answers/i);
    fireEvent.click(checkAnswersButton);
    expect(question0Answer3.className).toBe("answer--button red--background--color check--answers--opacity");
    expect(question1Answer1.className).toBe("answer--button green--background--color");

});

it("changes the check answers button with new game button after check answers button is pressed", ()=>{
    const questions:QuestionModel[]=[
        {
            questionId:0,
            question:"Q0",
            allAnswers:["Q0A0","Q0A1","Q0A2","Q0A3"],
            correctAnswer:"Q0A2",
        },
        {
            questionId:1,
            question:"Q1",
            allAnswers:["Q1A0","Q1A1","Q1A2","Q1A3"],
            correctAnswer:"Q1A1",
        }

    ];
    render(<GameScreen allQuestions={questions} newGameHandler={jest.fn}/>);
    //check if newGameButton is in the document
    const failToFindNewGameButton = screen.queryByText(/new game/i);
    expect(failToFindNewGameButton).toBeNull();
    //click check answers button
    const checkAnswersButton = screen.getByText(/check answers/i);
    fireEvent.click(checkAnswersButton);

    //check if newGameButton is in the document now
    const newGameButton = screen.getByText(/new game/i);
    expect(newGameButton).toBeInTheDocument();

    //check if checkAnswersButton was eliminated
    const failToFindCheckAnswers = screen.queryByText(/check answers/i);
    expect(failToFindCheckAnswers).toBeNull();

});

it("highlights the answers correctly and count how many of them are correctly selected by the user", ()=>{
    const questions:QuestionModel[]=[
        {
            questionId:0,
            question:"Q0",
            allAnswers:["Q0A0","Q0A1","Q0A2","Q0A3"],
            correctAnswer:"Q0A2",
        },
        {
            questionId:1,
            question:"Q1",
            allAnswers:["Q1A0","Q1A1","Q1A2","Q1A3"],
            correctAnswer:"Q1A1",
        },
        {
            questionId:2,
            question:"Q2",
            allAnswers:["Q2A0","Q2A1","Q2A2","Q2A3"],
            correctAnswer:"Q2A2",
        }
    ];
    render(<GameScreen allQuestions={questions} newGameHandler={jest.fn}/>);
    const question0answer2 = screen.getByRole("button",{name:/q0a2/i});//correct answer
    const question1answer3 = screen.getByRole("button",{name:/q1a3/i});//incorrect answer
    const question2answer2 = screen.getByRole("button",{name:/q2a2/i});//correct answer

    //click on answers
    fireEvent.click(question0answer2);
    fireEvent.click(question1answer3);
    fireEvent.click(question2answer2);

    //click on check answers button
    const checkAnswersButton = screen.getByRole("button",{name:/check answers/i});
    fireEvent.click(checkAnswersButton);

    expect(question0answer2.className).toBe("answer--button green--background--color");
    expect(question1answer3.className).toBe("answer--button red--background--color check--answers--opacity");
    expect(question2answer2.className).toBe("answer--button green--background--color");

    //the counter should display 2/3
    const counter = screen.getByTestId(/counter-h1/i);
    expect(counter).toBeInTheDocument();
    expect(counter.innerHTML).toBe("2/3");//only 2 answers were correctly selected
});


