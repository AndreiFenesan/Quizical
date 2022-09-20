import React from "react";
import ReactDOM from "react-dom";
import Answer from "../Answer";
import {render, screen, cleanup, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom"

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Answer isCheckAnswerButtonPressed={false} answerId={1} answer={"Answer1"} onClick={jest.fn} className={"className"}/> ,div);
});
it("answer button is enabled" ,() =>{
    render(<Answer isCheckAnswerButtonPressed={false} answerId={1} answer={"Answer1"} onClick={jest.fn} className={"className"}/>);
    const answer = screen.getByText("Answer1");
    expect(answer).toBeEnabled();
});

it("triggers a function when is clicked", () => {
    const onClick = jest.fn();
    render(<Answer isCheckAnswerButtonPressed={false} answerId={1} answer={"Answer1"} onClick={onClick} className={"className"}/>);
    const answerElement = screen.getByText(/answer1/i);
    fireEvent.click(answerElement);
    expect(onClick).toHaveBeenCalledTimes(1);
});

it("disables the answer button if isCheckAnswerButtonPressed is true", () =>{
    render(<Answer isCheckAnswerButtonPressed={true} answerId={1} answer={"Answer1"} onClick={jest.fn} className={"className"}/>);
    const answer = screen.getByText("Answer1");
    expect(answer).toBeDisabled();
})