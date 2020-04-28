import axios from 'axios'
import React, { useState } from 'react'

import descriptions from '../data/descriptions'

const CAMPUSES = [
  'Stockholm City',
  'Stockholm Norra',
  'Stockholm Södra',
  'Göteborg',
  'Jönköping',
  'Örebro'
]

export default function ({ topGifts }) {
  const [email, setEmail] = useState('')
  const [campus, setCampus] = useState('Stockholm City')

  async function sendResult () {
    if (!email.trim()) return

    const body = topGifts
      .map((gift) => `<div>${descriptions[gift]}</div>`)
      .join('')

    const response = await axios
      .post('/.netlify/functions/mail', { body, email })
      .catch(console.error)

    console.log(response.data)
  }

  return (
    <div>
      {topGifts.map((g, i) => {
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: descriptions[g] }}></div>
        )
      })}
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={sendResult}>Skicka resultatet till dig själv</button>
    </div>
  )
}
