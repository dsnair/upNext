// This script makes Twilio send me an SMS

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioNumber = process.env.TWILIO_NUMBER
const myNumber = process.env.MY_PHONE_NUMBER

const client = require('twilio')(accountSID, authToken)

async function sendSMS() {
  try {
    const message = await client.messages.create({
      to: myNumber,
      from: twilioNumber,
      body: 'Hi Divya, from Twilio 👋'
    })
    console.log(message.sid)
  } catch (error) {
    console.error(error)
  }
}

sendSMS()
