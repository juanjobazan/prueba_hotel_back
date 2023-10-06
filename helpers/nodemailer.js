const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "bazanjuanjordan@gmail.com",
        pass: "yhrvqncdrediuxom"
    }
})


module.exports = transporter