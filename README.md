# Steps to Send (Outbound) SMS or MMS

#1

```bash
npm install twilio
```

#2 Write the `send-sms.js` file

#3

- Write the `twilio.env` file
- Include `.env` in `.gitignore`

```bash
source ./twilio.env
```

#4

```bash
node send-sms.js

# or
node send-mms.js
```

returns sends an SMS (or MMS) `to` the number provided

# STEPS to Receive (Inbound) SMS or MMS

#1

```bash
npm init -y
npm install express ngrok
npm install -D nodemon
```

#2 Write the express app in `server.js`, then

```bash
npm run server
```

returns the ngrok public URL

#3 In your Twilio account, go to Manage Numbers > Active Numbers > Messaging > A Message Comes In:

- select Webhook from the dropdown
- copy-paste the ngrok public URL in the input box
- Save

#4 Respond to the SMS from the Twilio number

- this sends a request to the ngrok public URL
- you may go to [http://localhost:4040](http://localhost:4040) in the browser to inspect the request and response and to debug
