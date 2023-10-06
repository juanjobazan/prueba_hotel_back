const express = require ('express')
const router = express.Router()

const { sendMail } = require('../utils/mensajesNodemailer')

router.post('/', sendMail)

module.exports = router