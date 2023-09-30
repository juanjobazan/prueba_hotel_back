const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const servicioRoute = require('./servicio')

router.use('/user',userRoute)
router.use('/servicio',servicioRoute)
module.exports = router