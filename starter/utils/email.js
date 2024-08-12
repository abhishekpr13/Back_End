const nodemailer = require('nodemailer');


const sendEmail = async options =>{
    //1) Transporter we have to create

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //2) Define email option
    const mailOptions = {
        from:'Abhishek Prakash <prakash@hello,io>',
        to: options.email,
        subject: options.subject,
        tetx: options.message
    };

    //3) send the email with nodemailer
    await transporter.sendEmail(mailOptions)
};

module.exports = sendEmail;