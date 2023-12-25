import { sendAlert } from '../../src/utils/alert.js'
import chai from 'chai'

const expect = chai.expect

describe('Alert Function', () => {
  it('should send an email and SMS alert', async () => {
    // Mock the nodemailer and twilio functions
    // ...

    await sendAlert('Test message', { /* email config */ }, { /* twilio config */ })

    // Assertions to verify that emails and SMS messages are sent
    // ...
  })
})
