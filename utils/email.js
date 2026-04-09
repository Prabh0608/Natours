const axios = require('axios');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.fromEmail = process.env.EMAIL_FROM;
    this.fromName = 'Prabhjot Singh Saini';
  }

  async send(template, subject) {
    // 1) Render HTML
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Send via Brevo REST API
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: this.fromName,
          email: this.fromEmail,
        },
        to: [
          {
            email: this.to,
            name: this.firstName,
          },
        ],
        subject: subject,
        htmlContent: html,
        textContent: htmlToText(html),
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)',
    );
  }
};
