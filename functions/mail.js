const { MAILGUN_KEY, MAILGUN_DOMAIN, MAILGUN_ENDPOINT } = process.env
const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN,
  host: MAILGUN_ENDPOINT
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
  const { body, email, campus } = JSON.parse(event.body)
  const data = {
    from: 'Online Evening College <system@hillsong.se>',
    to: email,
    subject: 'Gåvotest',
    html: `
      <div
        style="max-width: 800px;
        padding: 10px;
        margin: 0 auto;">
        <h1>Tack att du gjorde gåvotestet</h1>
        <p>Vi hoppas att du lärde dig något nytt om dig själv. Här dina topp tre andliga gåvor:</p>
        <hr>
        ${body}
      </div>
    `
  }
   
  try {
    const body = await mailgunPromise(data)
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'text/html'
      }
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
