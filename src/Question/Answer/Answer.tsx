import React from "react";
const he =require("he");
export default function Answer(props: { answerId: number, className: string, onClick: () => void, answer: string }) {
    return <input
        id={`${props.answerId}`}
        type={"button"}

        className={props.className}
        onClick={props.onClick}
        value={he.decode(props.answer)}//must decode de answer because it contains html entities
    />;
}