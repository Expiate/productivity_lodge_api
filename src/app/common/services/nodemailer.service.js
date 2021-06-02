const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GOOGLE_CLOUD_CLIENT, // ClientID
    process.env.GOOGLE_CLOUD_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken()

const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.MAIL_USER, 
        clientId: process.env.GOOGLE_CLOUD_CLIENT,
        clientSecret: process.env.GOOGLE_CLOUD_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
});

/*
const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
*/

/**
 * This Function will use the Email specified in the transport constant to send a confirmation email
 * to the email provided in the params that holds the confirmationCode provided in the params
 * as well
 *
 * @param {*} name
 * @param {*} email
 * @param {*} confirmationCode
 */
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Please confirm your account',
        generateTextFromHTML: true,
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for using Productivity Lodge. Please confirm your email by clicking on the following link</p>
        <p>${confirmationCode}</p>
        </div>`
    };
    smtpTransport.sendMail(mailOptions, (error, response) => {
        error ? console.log(error) : console.log(response);
        smtpTransport.close();
    });
};
