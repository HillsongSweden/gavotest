import React, { useState } from 'react'
import GiftForm from './GiftForm'
import './App.css'
import LanguagePicker from './LanguagePicker'
import translations from '../functions/translations'

let locale = new URL(window.location).searchParams.get('lang')

if (locale) {
  window.localStorage.setItem('locale', locale)
} else {
  locale = window.localStorage.getItem('locale')
}

function App() {
  const [testStarted, setTestStarted] = useState(false)
  const [questions, setQuestions] = useState(translations.test)
  const [language, setLanguage] = useState(locale || 'sv_SE')

  return (
    <div className="App">
      <img src="ec-logo.png" alt="Evening College Logo" className="ec-logo" />
      <main>
        <LanguagePicker language={language} setLanguage={setLanguage} />
        {testStarted
          ? <GiftForm questions={questions} setQuestions={setQuestions} language={language} />
          :  <>
              <div dangerouslySetInnerHTML={{ __html: translations.intro_text[language] }}></div>
              <button className="btn" onClick={() => setTestStarted(true)}>Starta testet</button>
            </>
        }
      </main>
    </div>
  )
}

export default App
