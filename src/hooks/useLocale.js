import translations from '../functions/questions'

export default function useLocale () {
  let locale = new URL(window.location).searchParams.get('lang')

  if (locale) {
    window.localStorage.setItem('locale', locale)
  } else {
    locale = window.localStorage.getItem('locale')
  }

  return translations[locale || 'sv_SE']
}
