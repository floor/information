import nodemailer from 'nodemailer'
import twilio from 'twilio'

export async function sendAlert (message, config) {
  if (config.alertMethods.email) {
    // Send Email
    const mailTransporter = nodemailer.createTransport(config.mail.auth)
    const mailOptions = {
      from: config.mail.auth.auth.user,
      to: config.mail.recipient,
      subject: 'Service Down Alert',
      text: message
    }
    await mailTransporter.sendMail(mailOptions)
  }

  if (config.alertMethods.sms && config.twilio) {
    // Twilio SMS logic
    const twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken)

    // Loop through each Twilio recipient and send an SMS
    for (const recipient of config.twilio.recipients) {
      await twilioClient.messages.create({
        body: message,
        from: config.twilio.phoneNumber,
        to: recipient
      })
    }
  }
}
