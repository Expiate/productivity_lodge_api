const { config } = require("dotenv/types");

config()

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for using Productivity Lodge. Please confirm your email by clicking on the following link</p>
            <a href=${process.env.SERVER_URL}/signup/confirm/${confirmationCode}>Click here</a>
            </div>`,
    }).catch(err => console.log(err));
};