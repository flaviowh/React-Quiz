import React from "react"

export default function Question(props){

    const answers = props.answers.map(ans => (
        <button className="question-answer">{ans.text}</button>
    ))
    
    
    return (
        <div className="question">
        <h1 className="question-text">{props.question}</h1>
        <div className="question-answers">
         {answers}
        </div>
        <hr className="space-line"></hr>
        </div>
    )        
}