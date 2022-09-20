import React from "react";
import ReactDOM from "react-dom";
import AnswersCounter from "../AnswersCounter";
import {isTSAnyKeyword} from "@babel/types"

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AnswersCounter></AnswersCounter>)
})
