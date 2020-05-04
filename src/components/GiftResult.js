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

  async function sendResult () {
    if (!email.trim()) return

    const response = await axios
      .post('/.netlify/functions/mail', {
        topGifts,
        email,
        campus,
        shareWithCampusPastor,
        language
      })
      .catch(console.error)
  }

  return (
    <div>
      <h1>{translations.these_are_your_top_three[language]}</h1>
      {topGifts.map((g, i) => {
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: descriptions[g] }}></div>
        )
      })}
      <div className="email-result">
        <h3>{translations.send_your_results_to_yourself[language]}</h3>
        <div className="form-group">
          <Dropdown options={CAMPUSES} onSelect={setCampus} placeholderText={translations.select_your_campus[language]} />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={translations.email[language]} />
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
        <button className="btn" onClick={sendResult}>{translations.send[language]}</button>
      </div>
    </div>
  )
}
