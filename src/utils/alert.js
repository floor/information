import nodemailer from 'nodemailer'
import twilio from 'twilio'

export async function alert (message, config) {
  if (config.alert.methods.email) {
    // Send Email
    const mailTransporter = nodemailer.createTransport(config.mail.auth)
    for (const recipient of config.mail.recipients) {
      const mailOptions = {
        from: config.mail.auth.auth.user,
        to: recipient,
        subject: 'Service Down Alert',
        text: message
      }
      try {
      // Send Email
        await mailTransporter.sendMail(mailOptions)
      } catch (error) {
      // Log the error
        console.error('Failed to send email alert:', error)
      }
    }
  }

  if (config.alert.methods.sms && config.twilio) {
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
