import React, { useState } from 'react'
import GiftForm from './GiftForm'
import GiftResult from './GiftResult'
import './App.css'
import useLocale from '../hooks/useLocale'

function App() {
  const translations = useLocale()
  const [questions, setQuestions] = useState(translations.test)
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
      <img src="ec-logo.png" alt="Evening College Logo"/>
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
