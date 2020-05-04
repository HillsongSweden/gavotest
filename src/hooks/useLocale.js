import { useState } from 'react'

// let locale = new URL(window.location).searchParams.get('lang')

// if (locale) {
//   window.localStorage.setItem('locale', locale)
// } else {
//   locale = window.localStorage.getItem('locale')
// }

export default function useLocale (initial = 'sv_SE') {
  const [language, setLanguage] = useState(initial)
  return [language, setLanguage]
}
