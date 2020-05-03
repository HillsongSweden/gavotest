import axios from 'axios'
import React, { useState } from 'react'
import Dropdown from './Dropdown'

import descriptions from '../functions/descriptions'

const CAMPUSES = [
  'Stockholm City',
  'Stockholm Norra',
  'Stockholm Södra',
  'Göteborg',
  'Jönköping',
  'Örebro'
]

export default function ({ topGifts, resetForm }) {
  const [email, setEmail] = useState('')
  const [campus, setCampus] = useState('Stockholm City')
  const [emailSent, setEmailSent] = useState(false)

  async function sendResult () {
    if (!email.trim()) return

    const response = await axios
      .post('/.netlify/functions/mail', { topGifts, email, campus })
      .catch(console.error)
  }

  return (
    <div>
      <h1>These are your top three spiritual gifts</h1>
      {topGifts.map((g, i) => {
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: descriptions[g] }}></div>
        )
      })}
      <div className="email-result">
        <h3>Send your results to yourself</h3>
        <div className="form-group">
          <Dropdown options={CAMPUSES} onSelect={setCampus} placeholderText="Select your campus" />
        </div>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address" />
        </div>
        <button className="btn" onClick={sendResult}>Send the email</button>
      </div>
    </div>
  )
}
