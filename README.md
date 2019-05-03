# Steps to Send SMS

#1 
```bash
npm install twilio
```

#2 Write the `send-sms.js` file

#3 
- Write the `twilio.env` file, which contains the Twilio SID, auth token, and to/from phone numbers
- Include `.env` in `.gitignore`

```bash
source ./twilio.env
```

#4
```bash
node send-sms.js
```

returns the message SID in the console (starts with SM) and sends an SMS `to` the number provided

# Steps to Receive SMS