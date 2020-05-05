import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import RadioButton from './RadioButton'
import translations from '../functions/translations'

function classFactory (classes) {
  return Object.entries(classes).reduce((acc, cur) => {
    if (cur[1]) {
      acc += ' ' + cur[0]
    }
    return acc
  }, '')
}

export default function ({ setTopGifts, questions, setQuestionById, language }) {
  const completedCount = questions.filter(q => q.value !== undefined).length
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const nextQuestion = currentQuestion + 1
  const previousQuestion = currentQuestion - 1
  const showNext = questions[currentQuestion].value !== undefined && (currentQuestion + 1) < questions.length

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
      setQuestionById(id, value)
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion)
      }
    }
  }

  return (
    <form onSubmit={handleForm}>
      <ProgressBar completed={completedCount} total={questions.length} />
      <div dangerouslySetInnerHTML={{ __html: translations.intro_text[language] }}></div>

      <hr />

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
              <label>{question.question[language]}</label>
              <div className="grading">
                {
                  Array(4).fill().map((_, i) => (
                    <span key={i}>
                      <span>{i}</span>
                      <RadioButton
                        id={[questionId, i].join('.')}
                        checked={question.value === i}
                        value={i}
                        setValue={setQuestionValueById(index)} />
                    </span>
                  ))
                }
              </div>
            </fieldset>
          )
        })
        }
      </div>
      {currentQuestion > 0 && <button onClick={() => setCurrentQuestion(previousQuestion)} type="button">{translations.previous[language]}</button>}
      {showNext && <button onClick={() => setCurrentQuestion(nextQuestion)} type="button">{translations.next[language]}</button>}

      <p className={`error-text${error ? ' active' : ''}`}>{translations.please_answer_all_statements_first[language]}</p>
      <button type="submit" className="btn">{translations.get_your_results[language]}</button>
    </form>
  )
}
