import axios from 'axios'
import React, { useState } from 'react'
import Dropdown from './Dropdown'

import descriptions from '../functions/descriptions'
import translations from '../functions/questions2'

const CAMPUSES = [
  'Stockholm City',
  'Stockholm Norra',
  'Stockholm Södra',
  'Göteborg',
  'Jönköping',
  'Örebro'
]

export default function ({ topGifts, resetForm, language }) {
  const [email, setEmail] = useState('')
  const [campus, setCampus] = useState('Stockholm City')
  const [emailSent, setEmailSent] = useState(false)
  const [shareWithCampusPastor, setShareWithCampusPastor] = useState(false)

  async function sendResult (e) {
    e.preventDefault()
    if (!email.trim()) return

    try {
      const response = await axios
        .post('/.netlify/functions/mail', {
          topGifts,
          email,
          campus,
          shareWithCampusPastor,
          language
        })
      
      setEmailSent(true)
    } catch (error) {
      console.log(error)
    }
  }

  if (emailSent) {
    return (
      <div>
        <h1>Thank you for taking the test!</h1>
        <button type="button" onClick={resetForm}>Click here to start over</button>
      </div>
    )
  }

  return (
    <div>
      <h3>{translations.these_are_your_top_three[language]}</h3>
      {topGifts.map((g, i) => {
        return (
          <h2 key={i}>{translations[g][language]}</h2>
        )
      })}
      <form onSubmit={sendResult} className="email-result">
        <h3>{translations.send_your_results_to_yourself[language]}</h3>
        <div className="form-group">
          <Dropdown options={CAMPUSES} onSelect={setCampus} placeholderText={translations.select_your_campus[language]} />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={translations.email[language]} required />
        </div>
        <div className="form-group">
          <label htmlFor="shareWithPastor">{translations.share_your_results_with_your_campus_pastor[language]}</label>
          <input
            id="shareWithPastor"
            type="checkbox"
            checked={shareWithCampusPastor}
            onChange={e => setShareWithCampusPastor(e.target.checked)}
            placeholder={translations.email[language]} />
        </div>
        <button className="btn" type="submit">{translations.send[language]}</button>
      </form>
    </div>
  )
}
