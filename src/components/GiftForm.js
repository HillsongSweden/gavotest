import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import useLocale from '../hooks/useLocale'

function Checkbox ({ value, setValue, checked }) {
  return (
    <label className={`radiobutton${checked ? ' active' : ''}`}>
      <input type="radio" value={value} checked={checked} onChange={e => setValue(e.target.value)} />
    </label>
  )
}

function classFactory (classes) {
  return Object.entries(classes).reduce((acc, cur) => {
    if (cur[1]) {
      acc += ' ' + cur[0]
    }
    return acc
  }, '')
}

export default function ({ setTopGifts, questions, setQuestionById }) {
  const translations = useLocale()
  const completedCount = questions.filter(q => q.value !== undefined).length
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const nextQuestion = currentQuestion + 1
  const previousQuestion = currentQuestion - 1
  const isAnswered = questions[currentQuestion].value !== undefined

  const [error, setError] = useState(false)

  async function handleForm (e) {
    e.preventDefault()

    // if (completedCount !== questions.length) {
    //   setError(true)
    //   return
    // }
      
    const giftScores = questions
      .filter(q => q.value)
      .reduce((acc, cur) => {
        const { type, value } = cur
        acc[type] = acc[type] !== undefined
          ? (acc[type] + value)
          : value
        return acc
      }, {})

    const topThreeGifts = Object.entries(giftScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(x => x[0])

    setTopGifts(topThreeGifts)
  }

  function setQuestionValueById (id) {
    return function (value) {
      setError(false)
      setCurrentQuestion(nextQuestion)
      setQuestionById(id, value)
    }
  }

  return (
    <form onSubmit={handleForm}>
      <ProgressBar completed={completedCount} total={questions.length} />
      <div dangerouslySetInnerHTML={{ __html: translations.intro_text }}></div>

      <div className="questions">
        {questions.map((question, index) => {
          const questionId = question.type + '@' + index

          return (
            <fieldset
              key={questionId}
              className={classFactory({
                question: true,
                active: index === currentQuestion,
                done: index < currentQuestion
              })}>
              <label htmlFor={questionId}>
                {question.question}
              </label>
              {
                Array(4).fill().map((_, i) => (
                  <Checkbox
                    key={i}
                    checked={question.value === i}
                    value={i}
                    setValue={setQuestionValueById(index)} />
                ))
              }
            </fieldset>
          )
        })
        }
      </div>
      {currentQuestion > 0 && <button onClick={() => setCurrentQuestion(previousQuestion)} type="button">Previous</button>}
      {isAnswered && <button onClick={() => setCurrentQuestion(nextQuestion)} type="button">Next</button>}

      <p className={`error-text${error ? ' active' : ''}`}>Please answer all statements first</p>
      <button type="submit" className="btn">Show me my top gifts!</button>
    </form>
  )
}
