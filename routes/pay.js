const express = require('express')
const {postPay} = require('../controllers/pay')
const router = express.Router()

router.post('/',postPay)


module.exports = router