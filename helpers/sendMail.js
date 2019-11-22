'use strict'

// let transporter = nodemailer.createTransport(transport[, defaults])
function SendEmail(toEmail, messageBody) {
const fromEmail = 'javascript.dev37@gmail.com';
// const toEmail = 'javascript.dev37@gmail.com';

let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        // type: 'OAuth2',
        // user: 'javascript.dev37@gmail.com',
        // accessToken: 'ya29.Il-xB7svJPxhQ49Ey13clfjFw_jjjBTmKuRtZz3xluKMWYqwmqOcDxEP5mXfC3rzScDJXW6iIJPmWinm6RK_p26HYk-yfttgQXXHqVkVk1S1XxCv1XqM9b5yqdo8_JEMHQ'
      user: `${fromEmail}`,
      pass: "q1w2e3r4t5~!@#$%"
    }
});

// verify connection configuration
// transporter.verify(function(error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });

const subject = 'Booking Room';
// const msgBody = '';

let message = {
    from: `${fromEmail}`,
    to: `${toEmail}`,
    subject: `${subject}`,
    text: `${messageBody}`,
    //html: '<p>HTML version of the message</p>'
};

transporter.sendMail(message)
}

module.exports = SendEmail;
