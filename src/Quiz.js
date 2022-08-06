import { nanoid } from "nanoid"
import React from "react"

export default function Questions(props) {

    const [questions, setquestions] = React.useState(props.questions)
    const [answerSheet, setAnswerSheet] = React.useState(initialAnswers())
    const [finished, setFinished] = React.useState(false)


    function initialAnswers() {
        return questions.map(qst => (
            { id: qst.id, answer: '' }
        ))
    }

    function handleSelection(e) {
        let value = e.target.innerHTML
        let id = e.target.parentElement.id;

        setAnswerSheet(prevSheet => (
            prevSheet.map(answ => (
                answ.id === id ?
                    { ...answ, answer: value }
                    : answ
            ))
        ))
    }

    // React.useEffect(() =>{
    //     document.body.style.height = "auto"
    //   }, [answerSheet])

    function mixAnswers(question, random_seed) {
        let array = [...question.incorrect_answers]
        array.push(question.correct_answer)
        var j, x, i;
        for (i = array.length - 1; i > 0; i--) {
            j = Math.floor(random_seed * (i + 1));
            x = array[i];
            array[i] = array[j];
            array[j] = x;
        }
        return array;
    }


    const questionsList = questions.map(qst => {

        const randomizedAnswers = mixAnswers(qst, qst.random_seed)

        return (
            <QuestionDiv
                key={qst.id}
                id={qst.id}
                random_seed={qst.random_seed}
                question={qst.question}
                answers={randomizedAnswers}
            />
        )
    })


    function QuestionDiv(props) {

        const answerButtons = [props.answers.map(ans => {
            const colors = decideColors(ans)
            return (
                <button key={nanoid()} selected={false}
                    onClick={e => handleSelection(e)}
                    style={{ backgroundColor: colors[0], color: colors[1] }}
                    className="question-answer">{ans}</button>
            )
        }
        )]


        function decideColors(ans) {
            const defaultColors = ["white", "#293264"]
            if (finished) {
                if (questions.some(entry =>
                    entry.correct_answer === ans && entry.id === props.id)) {
                    return ["#94D7A2", "#293264"]
                }
                else if (answerSheet.some(entry =>
                    entry.answer === ans && entry.id === props.id)) {
                    return ["#F8BCBC", "#293264"]
                }
                else {
                    return defaultColors
                }
            }
            else {
                const colors = answerSheet.some(entry =>
                    entry.answer === ans && entry.id === props.id) ?
                    ['#293264', "white"]
                    : defaultColors
                return colors
            }
        }


        return (
            <div className="question" >
                <h1 className="question-text">{props.question}</h1>
                <div className="question-answers" id={props.id}>
                    {answerButtons}
                </div>
                <hr className="space-line"></hr>
            </div>
        )
    }

    function endGame() {
        if (!answerSheet.some(entry => entry.answer === "") && !finished) {
            setFinished(true);
        }
        else if(finished){
            window.location.reload(false);
        }
    }

    function scorePoints() {
        let total = 0
        for (let i = 0; i < questions.length; i++) {
            answerSheet[i].answer === questions[i].correct_answer && total++
        }
        return `You scored ${total}/${questions.length} correct answers.`
    }

    return (
        <div className='quizPage'>
            <h1 className='page-title'>React Quiz</h1>
            {questionsList}
            <button className='check-btn' onClick={endGame}>{!finished ? "Check Answers" : "Restart Game"}</button>
            {finished && <h1 id="game-score"> {scorePoints()}</h1>}
        </div>
    )

}