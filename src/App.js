import './App.css';
import React from "react"
import Question from './Question.js';
import { nanoid } from 'nanoid'



export default function App() {


  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuestions(formatData(data.results)))
  }, [])

  const seedata = () => console.log(questions)


  function formatData(data) {

    function formatAnswers(answers) {
      return answers.map(ans => (
        removeHTML(ans)
      )
      )
    }

    return data.map(entry => (
      {
        ...entry,
        id: nanoid(),
        question: removeHTML(entry.question),
        correct_answer: removeHTML(entry.correct_answer),
        incorrect_answers: formatAnswers(entry.incorrect_answers)
      }
    )
    )
  }

  function removeHTML(str) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }

  const [started, setStarted] = React.useState(false)

  function mixAnswers(question) {
    let answers = [question.correct_answer].concat(question.incorrect_answers)
    answers = answers.sort(() => Math.random() - 0.5)
    return answers.map(ans => { return { "text": ans, "selected": false } })
  }


  const questionsList = questions.map(qst => (
    <Question
      key={qst.id}
      question={qst.question}
      answers={mixAnswers(qst)}
    />
  ))

  function questionsDiv() {
    return (
      <div className='quizPage'>
        <h1 className='page-title'>React Quiz</h1>
        {questionsList}
        <button className='check-btn'>Check Answers</button>
      </div>
    )
  }

  function welcomeDiv() {
    return (
      <div className='welcome'>
        <h1 className='app-name'>React Quiz</h1>
        <h3 className='app-description'>Can you answer these questions?</h3>
        <button className='start-btn' onClick={()=> setStarted(true)} >Start Quiz</button>
      </div>
    )
  }

  return (
    <div className="App">
      {started ? questionsDiv() : welcomeDiv()}
    </div>
  );
}

