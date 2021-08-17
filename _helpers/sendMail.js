const nodemailer = require('nodemailer');

function sendMail(from, name, subject, message, cb) {
    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.AWS_PORT,
        secure: true,
        auth: {
            user: process.env.AWS_SES_USER,
            pass: process.env.AWS_SES_PASS
        }
    });
    
    const mailOptions = {
        from: process.env.SEND_EMAIL,
        to: process.env.RECIPIENT_EMAIL,
        subject,
        html: `
        <h1>New Reach Out</h1>
        <p>Name: ${name}</p>
        <p>Email: ${from}</p>
        <p>Message: ${message}</p>
        `
    }
    
    const replyOptions = {
        from: `Akanowo<${process.env.SEND_EMAIL}>`,
        to: from,
        subject: `Well Received`,
        text: 'Thank you for reaching out, I\'ll reach out to you within the next few hours.'
    }

    transport.sendMail(mailOptions, (err, response) => {
        if(err) {
            cb(err)
            return
        }
        transport.sendMail(replyOptions, (replyErr, replyRes) => {
            if(replyErr) {
                cb(replyErr);
                return;
            }
            cb(false, replyRes);
        })
    })
}

module.exports = sendMail;