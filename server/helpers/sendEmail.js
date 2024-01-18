const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smtp.example.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Email Verification",
    html: `<p>Click the following link to verify your email: 
           <a href="http://your-app-url/verify/${verificationToken}">Verify Email</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
