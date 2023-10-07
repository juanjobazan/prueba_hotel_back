const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const servicioRoute = require('./servicio')
const habitacionRouter = require('./habitacion')
const cartServicioRouter = require('./cartServicio')
const reservaRoute = require('./reserva')
const messageRoute = require('./message')
const imageRoute = require('./image')


router.use('/user',userRoute)
router.use('/servicio',servicioRoute)
router.use('/habitacion',habitacionRouter)
router.use('/cartServicio',cartServicioRouter)
router.use('/reserva',reservaRoute)
router.use('/message',messageRoute)
router.use('/image',imageRoute)


module.exports = router