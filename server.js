// This script makes Twilio respond to my SMS

const express = require('express')
const ngrok = require('ngrok')
const MessagingResponse = require('twilio').twiml.MessagingResponse

const app = express()
const port = 1000
app.listen(port, () => console.log(`server is listening 👂`))

// get public URL
const getURL = async function() {
  const url = await ngrok.connect(port)
  console.log(url)
}
getURL()

// route handlers
const postSMS = (req, res) => {
  const twiml = new MessagingResponse()
  twiml.message('Hi Divya')
  res.status(200).send(`${twiml}`)
}

// routes
app.post('/', postSMS)
