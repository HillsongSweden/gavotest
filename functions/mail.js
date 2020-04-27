const { MAILGUN_KEY, MAILGUN_DOMAIN } = process.env
const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN
})

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

exports.handler = async (event, context, callback) => {
  const data = {
    from: `Online Evening College <josef@${MAILGUN_DOMAIN}>`,
    to: 'josef.lekardal@hillsong.se',
    subject: 'Gåvotest',
    text: 'Här är ditt resultat!'
  }
   
  try {
    const body = await mailgunPromise(data)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    })
  } catch (error) {
    console.log('There was an error sending the email')
    console.log(error)
  
    callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  }
}
