const express = require('express');
const twilio = require('twilio');

const app = express();

app.post('/api/send-sms', (req, res) => {
  const { to, body } = req.body;

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  client.messages.create({
    to,
    from: process.env.TWILIO_PHONE_NUMBER,
    body,
  })
    .then(message => {
      res.json({ success: true, message: message.sid });
    })
    .catch(error => {
      res.json({ success: false, message: error.message });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
