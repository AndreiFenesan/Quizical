import React from "react";
import ReactDOM from "react-dom";
import AnswersCounter from "../AnswersCounter";
import {isTSAnyKeyword} from "@babel/types";
import {render,screen,cleanup} from "@testing-library/react";
import "@testing-library/jest-dom"

afterEach(cleanup);
it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AnswersCounter correctSelectedAnswers={1} totalNumberOfAnswers={5}></AnswersCounter>,div);
});

it("renders answersCounter correctly", () => {
   render(<AnswersCounter correctSelectedAnswers={1} totalNumberOfAnswers={5}/>);
   expect(screen.getByTestId("counter-h1")).toHaveTextContent("1/5");
});