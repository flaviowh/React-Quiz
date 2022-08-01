import './App.css';
import React from "react"
import Questions from './Quiz.js';
import { nanoid } from 'nanoid'



export default function App() {


  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setQuestions(formatData(data.results)))
  }, [])

  function formatData(data) {

    function formatAnswers(answers) {
      return answers.map(ans => (
        removeHTML(ans)
      )
      )
    }

    return data.map(entry => { 
      entry["random_seed"] = Math.random()
      return ({
        ...entry,
        id: nanoid(),
        question: removeHTML(entry.question),
        correct_answer: removeHTML(entry.correct_answer),
        incorrect_answers: formatAnswers(entry.incorrect_answers),
      })
    }
    )
  }  
  

  function removeHTML(str) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }

  const [started, setStarted] = React.useState(false)

  function welcomeDiv() {
    return (
      <div className='welcome'>
        <h1 className='app-name'>React Quiz</h1>
        <h3 className='app-description'>Can you answer these questions?</h3>
        <button className='start-btn' onClick={() => setStarted(true)} >Start Quiz</button>
      </div>
    )
  }

  return (
    <div className="App">
      {started ? <Questions questions={questions} /> : welcomeDiv()}
    </div>
  );
}

