import React, { useState } from 'react'
import GiftForm from './GiftForm'
import GiftResult from './GiftResult'
import './App.css'
import LanguagePicker from './LanguagePicker'
import translations from '../functions/questions2'

let locale = new URL(window.location).searchParams.get('lang')

if (locale) {
  window.localStorage.setItem('locale', locale)
} else {
  locale = window.localStorage.getItem('locale')
}

function App() {
  const [questions, setQuestions] = useState(translations.test)
  const [topGifts, setTopGifts] = useState()
  const [language, setLanguage] = useState(locale || 'sv_SE')

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
      <img src="ec-logo.png" alt="Evening College Logo" className="ec-logo" />
      <main>
        <LanguagePicker language={language} setLanguage={setLanguage} />
        {topGifts
          ? <GiftResult topGifts={topGifts} resetForm={() => setTopGifts()} language={language} />
          : <GiftForm setTopGifts={setTopGifts} questions={questions} setQuestionById={setQuestionById} language={language} />
        }
      </main>
    </div>
  )
}

export default App
