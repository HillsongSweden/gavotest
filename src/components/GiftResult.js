import React from 'react'
import descriptions from '../data/descriptions'

export default function ({ topGifts }) {
  return (
    <div>
      {topGifts.map((g, i) => {
        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: descriptions[g] }}></div>
        )
      })}
      <button>Skicka resultatet till dig själv</button>
    </div>
  )
}
