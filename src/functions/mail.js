const {
  MAILGUN_KEY, MAILGUN_DOMAIN, MAILGUN_ENDPOINT,
  GOOGLE_SHEET_ID, GOOGLE_PROJECT_ID, GOOGLE_PRIVATE_KEY_ID, GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL, GOOGLE_CLIENT_X509_CERT_URL, GOOGLE_CLIENT_ID
} = process.env

const { GoogleSpreadsheet } = require('google-spreadsheet')
const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN,
  host: MAILGUN_ENDPOINT
})

const translations = require('./translations')

const GOOGLE_AUTH = {
  type: 'service_account',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  project_id: GOOGLE_PROJECT_ID,
  private_key_id: GOOGLE_PRIVATE_KEY_ID,
  private_key: JSON.parse(GOOGLE_PRIVATE_KEY),
  client_email: GOOGLE_CLIENT_EMAIL,
  client_x509_cert_url: GOOGLE_CLIENT_X509_CERT_URL,
  client_id: GOOGLE_CLIENT_ID
}

const mailgunPromise = (data) => {
  return new Promise((res, rej) => {
    mailgun.messages().send(data, (error, body) => {
      if (error) {
        return rej(error)
      }
      return res(body)
    })
  })
}

exports.handler = async (event) => {
  const { topGifts, email, campus, language, firstname, lastname, shareWithCampusPastor } = JSON.parse(event.body)

  if (shareWithCampusPastor) {
    try {
      const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID)
      await doc.useServiceAccountAuth(GOOGLE_AUTH)
      
      await doc.loadInfo()
      const sheet = doc.sheetsByIndex[0]
      const gifts = topGifts.reduce((acc, cur) => {
        acc[cur] = true
        return acc
      }, {})
      
      await sheet.addRow({
        firstname,
        lastname,
        email, 
        campus,
        language,
        ...gifts,
      })
    } catch (error) {
      console.error('SOMETHING IS WRONG!')
      console.error(error)
    }
  }

  const giftMarkup = topGifts.map(gift => `<h3>${translations[gift][language]}</h3>`).join('')

  const data = {
    from: 'Online Evening College <system@hillsong.se>',
    to: email,
    subject: translations.online_gift_test[language],
    html: `
      <div
        style="
          max-width: 800px;
          padding: 2em;
          margin: 0 auto;
          background: #191919;
          text-align: center;
          color: #fff;
          font-size: 1.3em;
        ">
        <img src="https://d9nqqwcssctr8.cloudfront.net/wp-content/uploads/2020/03/31160601/EVENING-COLLEGE-logo-700x467.png" style="max-width: 300px;">
        <h1>${translations.thank_you_for_taking_the_test[language]}</h1>
        <p>${translations.these_are_your_top_three[language]}</p>
        <hr>
        ${giftMarkup}
      </div>
    `
  }

  try {
    const body = await mailgunPromise(data)

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'text/html'
      }
    }
  } catch (error) {
    console.log('There was an error sending the email')
    console.log(error)
  
    return {
      statusCode: 400,
      body: JSON.stringify({
        msg: 'There was an error sending you email'
      })
    }
  }
}
