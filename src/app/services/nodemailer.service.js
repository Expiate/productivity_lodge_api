const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

/**
 * This Function will use the Email specified in the transport constant to send a confirmation email to the email provided in the params that holds 
 * the confirmationCode provided in the params as well
 * 
 * @param {*} name 
 * @param {*} email 
 * @param {*} confirmationCode 
 */
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    transport.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for using Productivity Lodge. Please confirm your email by clicking on the following link</p>
            <a href=${process.env.SERVER_URL}/signup/confirm/${confirmationCode}>Click here</a>
            </div>`,
    }).catch(err => console.log(err));
};