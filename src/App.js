import './App.css';
import React from "react"
import Questions from './Quiz.js';
import { nanoid } from 'nanoid'



export default function App() {

  const [categories, setCategories] = React.useState([{ "id": 0, "name": "All" }])
  const [questions, setQuestions] = React.useState([])
  const [formData, setFormData] = React.useState(
    {
      num_questions: "5",
      category: "",
      difficulty: "",
    }
  )
  const [started, setStarted] = React.useState(false)
  const [apiURL, setURL] = React.useState("")


  React.useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => setCategories(any => [...any, ...data.trivia_categories]))
  }, [])
 

  React.useEffect(() => {
    if(apiURL){
    fetch(apiURL)
      .then(res => res.json())
      .then(data => setQuestions(formatData(data.results)))
      .then(
        setStarted(prevState => !prevState))
    }
  }, [apiURL])


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

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    })
  }


  function OptionsForm() {
    return (
      <form id='options-form'>
        <label className="sel_label" htmlFor='Categories'>Categories</label>
        <select
          id="categories"
          value={formData.category}
          onChange={handleChange}
          name="category"
          className='selection-box'
        >
          {categories.map(cat =>
            <option key={nanoid()} value={cat.id}>{cat.name}</option>
          )}
        </select>
        <br />
        <label className="sel_label" htmlFor='num_questions'>Number of questions</label>
        <br />
        <select
          id="numQuestions"
          value={formData.num_questions}
          onChange={handleChange}
          name="num_questions"
          className='selection-box'
        >
          {["5","6","7","8","9","10"].map(num =>
            <option key={nanoid()} value={num}>{num}</option>)}
        </select>
        <br />
        <label className="sel_label" htmlFor='Difficulty'>Difficulty</label>
        <br />
        <select
          id="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          name="difficulty"
          className='selection-box'
        >
          <option value="all">All</option>
          <option value="easy">Easy</option>
          <option value="medium">medium</option>
          <option value="hard">Hard</option>
        </select>
      </form>
    )
  }

  function removeHTML(str) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = str;
    return tmp.textContent || tmp.innerText || "";
  }



  function welcomeDiv() {
    return (
      <div className='welcome'>
        <h1 className='page-title'>React Quiz</h1>
        <h3 className='app-description'>Can you answer these questions?</h3>
        <OptionsForm />
        <button className='start-btn' onClick={startGame} >Start Quiz</button>
      </div>
    )
  }

  function startGame() {
    window.event.preventDefault()
    let baseURL = `https://opentdb.com/api.php?amount=${formData.num_questions}`
    const category = formData.category && formData.category !== "All" ? `&category=${formData.category}` : ''
    const difficulty = formData.difficulty && formData.difficulty !== "All" ? `&difficulty=${formData.difficulty}` : ''
    let updatedURL = baseURL + category + difficulty
    setURL(updatedURL)
    setStarted(prevState => !prevState)
  }

  return (
    <div className="App">
      {started ? <Questions questions={questions}/> : welcomeDiv()}
    </div>
  );
}

