const nodemailer = require("nodemailer");
// 1. Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// 2. Define the email options
const sendVerificationEmail = async (
  name,
  email,
  subject,
  token,
  action,
  action2
) => {
  console.log(email);
  const mailOptions = {
    from: "Colafee <paretashubham2210@gmail.com>",
    to: email,
    subject: subject,
    html: `
        <p>Hello ${name},</p>

        <p>Please click on the button to ${action}:</p>
        
        <a href="http://localhost:4200/auth/verifyEmail/${token}"><button>Click here</button></a>
        
        <p> Or Click the below given link ${action}:</p>
        <a href="http://localhost:4200/auth/verifyEmail/${token}">Click here to ${action2}</a>

        <p>Thank you,</p>
        <p>The Colafee Team</p>
        `,
  };

  // 3. Actually send the email

  await transporter.sendMail(mailOptions).catch((err) => console.log(err));
};
module.exports = sendVerificationEmail