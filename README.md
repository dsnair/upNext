# Steps to Send SMS or MMS

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

```bash
node send-mms.js
```

returns the message SID in the console (starts with SM for SMS or MS for MMS) and sends an SMS (or MMS) `to` the number provided
