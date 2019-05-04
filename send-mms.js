// This script makes Twilio send me an MMS

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioNumber = process.env.TWILIO_NUMBER
const myNumber = process.env.MY_PHONE_NUMBER

const client = require('twilio')(accountSID, authToken)

async function sendMMS() {
  try {
    const message = await client.messages.create({
      to: myNumber,
      from: twilioNumber,
      body: 'Hi Divya, here is a cute maltese puppy for you 🐶',
      mediaUrl:
        'https://upload.wikimedia.org/wikipedia/commons/8/86/Maltese_puppy.jpeg'
    })
    console.log(message.sid)
  } catch (error) {
    console.error(error)
  }
}

sendMMS()
