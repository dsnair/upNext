// env consts
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_NUMBER
const myNumber = process.env.MY_PHONE_NUMBER

// imports
const express = require('express')
const ngrok = require('ngrok')
const client = require('twilio')(accountSID, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse

// setup express
const app = express()
const port = 1000
app.listen(port, () => console.log(`server is listening 👂`))

// get public URL
async function getURL() {
  const url = await ngrok.connect(port)
  console.log(url)
}
getURL()

// send myself an SMS from Twilio
const position = Math.floor(Math.random() * 20) + 1 // random number between 1 and 20

async function sendSMS(body) {
  try {
    await client.messages.create({
      to: myNumber,
      from: twilioNumber,
      body
    })
  } catch (error) {
    console.error(error)
  }
}

sendSMS(
  `Hi Divya, you're #${position}. I'll let you know when you're up soon! Feel free to ask me for an update anytime.`
)

// send myself an SMS when I'm up soon in line
setTimeout(
  () =>
    sendSMS(
      `Hey, you're up shortly! Now serving #${Math.floor(
        Math.random() * position
      ) +
        (position - 5)}`
    ),
  5000
)

// have Twilio respond to my SMS
function respondToSMS(req, res) {
  const twiml = new MessagingResponse()
  twiml.message(`Now serving #${Math.floor(Math.random() * position) + 1}.`)
  res.status(200).send(`${twiml}`)
}

app.post('/', respondToSMS)
