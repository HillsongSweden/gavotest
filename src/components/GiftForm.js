import React, { useState } from 'react'
import ProgressBar from './ProgressBar'

export default function ({ setTopGifts, questions, setQuestionById }) {
  const completedCount = questions.filter(q => q.value !== undefined).length

  const [error, setError] = useState()

  function handleForm (e) {
    e.preventDefault()

    if (completedCount !== questions.length) {
      setError('Please answer all statements first')
      return
    }
      
    const giftScores = questions.reduce((acc, cur) => {
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
  
  
  return (
    <form onSubmit={handleForm}>
      <ProgressBar completed={completedCount} total={questions.length} />

      <h1>What are your top gifts?</h1>

      {questions.map((question, index) => {
        const questionId = question.type + '@' + index

        return (
          <fieldset key={questionId}>
            <label htmlFor={questionId}>
              {question.question}
            </label>
            {
              Array(4).fill().map((_, i) => (
                <label htmlFor={questionId + i} className={`radiobutton ${question.value === i ? ' active' : ''}`} key={i}>
                  <input id={questionId + i} type="radio" value={i} checked={question.value === i} onChange={e => setQuestionById(index, e.target.value)} />
                </label>
              ))
            }
          </fieldset>
        )
      })
      }
      {error && <p className="error-text">{error}</p>}
      <button type="submit" className="btn">Show me my top gifts!</button>
    </form>
  )
}
