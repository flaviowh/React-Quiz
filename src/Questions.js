import { nanoid } from "nanoid"
import React from "react"

export default function Questions(props) {

    const [answerStatus, setAnswerStatus]  = React.useState(props.questions)


    function AnswersDiv(props) {
        return props.answers.map(ans => (
            <button key={nanoid()} className="question-answer">{ans.text}</button>
        ))
    }

    const questionsList = answerStatus.map(qst => (
        <QuestionDiv
            key={qst.id}
            question={qst.question}
            answers={mixAnswers(qst)}
        />
    ))

    function mixAnswers(question) {
        let answers = [question.correct_answer].concat(question.incorrect_answers)
        answers = answers.sort(() => Math.random() - 0.5)
        return answers.map(ans => { return { "text": ans, "selected": false } })
    }


    function QuestionDiv(props) {
        return (
            <div className="question">
                <h1 className="question-text">{props.question}</h1>
                <div className="question-answers">
                    <AnswersDiv answers={props.answers} />
                </div>
                <hr className="space-line"></hr>
            </div>
        )
    }

    return (
        <div className='quizPage'>
            <h1 className='page-title'>React Quiz</h1>
            {questionsList}
            <button className='check-btn'>Check Answers</button>
        </div>
    )

}