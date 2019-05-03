const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioNumber = process.env.TQ_TWILIO_NUMBER
const myNumber = process.env.MY_PHONE_NUMBER

const client = require('twilio')(accountSID, authToken)

client.messages
  .create({
    to: myNumber, // my cell phone #
    from: twilioNumber, // phone number from twilio
    body: 'Hi Divya, from Twilio 👋'
  })
  .then(message => console.log(message.sid))
  .catch(error => console.error(error))
