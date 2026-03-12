const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'd785e7d4cb628e',
      pass: '3de8b8ecf78b39',
    },
  });

  const mailOptions = {
    from: 'Prabhjot Singh Saini <sainiprabhjot75@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
