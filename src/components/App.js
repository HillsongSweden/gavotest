import React, { useState } from 'react'
import GiftForm from './GiftForm'
import GiftResult from './GiftResult'
import './App.css'
import initialQuestions from '../functions/questions'

function App() {
  const [questions, setQuestions] = useState(initialQuestions)
  const [topGifts, setTopGifts] = useState()

  function setQuestionById (id, value) {
    setQuestions(
      questions.map(({ ...q }, i) => {
        if (i === id) {
          q.value = parseInt(value)
        }
  
        return q
      })
    )
  }

  return (
    <div className="App">
      <main>
        {topGifts
          ? <GiftResult topGifts={topGifts} resetForm={() => setTopGifts()} />
          : <GiftForm setTopGifts={setTopGifts} questions={questions} setQuestionById={setQuestionById} />
        }
      </main>
    </div>
  )
}

export default App
