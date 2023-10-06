const transporter = require('../helpers/nodemailer')

const sendMail = async () => {//(userMail)
    await transporter.sendMail({
        from: "bazanjuanjordan@gmail.com",
        to: "bazanjuanjordan@gmail.com",//userMail
        sebject: "Mensaje de Prueba",
        html: `
        <p>Mensaje enviado desde el Back</p>
        `
    })
}


module.exports = {
    sendMail
}