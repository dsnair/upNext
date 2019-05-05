// ENV variables
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_NUMBER
const myNumber = process.env.MY_PHONE_NUMBER

// IMPORTS
const express = require('express')
const ngrok = require('ngrok')
const client = require('twilio')(accountSID, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse

// GLOBAL variables
const port = 1000

const length = 20
let queue = new Array(length).fill('') // array of empty strings
const index = Math.floor(Math.random() * length) // random number between 0 and 19
queue.fill(twilioNumber, index, index + 1) // assign customer a position in queue with id twilioNumber

// FUNCTIONS

// get public URL
async function getURL() {
  const url = await ngrok.connect(port)
  console.log(url)
}

// send myself an SMS from Twilio
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

// process queue
function serveNextCustomer() {
  queue.shift()
  return queue[0] // this is next customer
}

function processQueue() {
  if (!queue.length) clearInterval(startProcessing)

  if (queue[0] === twilioNumber) sendSMS(`Your turn!`)

  const nextCustomer = serveNextCustomer()
  if (nextCustomer === twilioNumber) sendSMS(`You're up next!`)
}

// have Twilio respond to my SMS query
function respondToSMS(req, res) {
  const twiml = new MessagingResponse()

  const numberOfPeople = queue.indexOf(twilioNumber)
  numberOfPeople <= 0
    ? twiml.message(`It's your turn now!`)
    : twiml.message(`There are ${numberOfPeople} people ahead of you.`)
  
  res.status(200).send(`${twiml}`)
}

// SETUP EXPRESS
const app = express()
app.listen(port, () => console.log(`server is listening 👂`))

// FUNCTION CALLS
getURL()

sendSMS(
  `Hi Divya! You're #${index} in line. We'll let you know when you're up next! Feel free to ask for an update anytime.`
)

const startProcessing = setInterval(processQueue, 3 * 1000)

app.post('/', respondToSMS)
