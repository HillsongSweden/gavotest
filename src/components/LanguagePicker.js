import React from 'react'

const COUNTRY_CODES = ['sv_SE', 'en_GB', 'es_ES']
export default function ({ language, setLanguage }) {
  return (
    <div className="language-picker">
      {COUNTRY_CODES.map(code => (
        <img src={code + '.png'} alt={'Country ' + code} className={code === language ? 'active' : ''} onClick={() => setLanguage(code)} key={code} />
      ))}
    </div>
  )
}
