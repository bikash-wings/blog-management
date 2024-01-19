const nodemailer = require("nodemailer");
const { SMTP_MAIL, SMTP_PASSWORD } = process.env;

const sendMail = async (email, subject, content) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: SMTP_MAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_MAIL,
      to: email,
      subject: subject,
      html: content,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error.message);
      } else {
        console.log("mail sent successfully:-", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
