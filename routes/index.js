const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const servicioRoute = require('./servicio')
const habitacionRouter = require('./habitacion')
const cartServicioRouter = require('./cartServicio')
const reservaRoute = require('./reserva')


router.use('/user',userRoute)
router.use('/servicio',servicioRoute)
router.use('/habitacion',habitacionRouter)
router.use('/cartServicio',cartServicioRouter)
router.use('/reserva',reservaRoute)


module.exports = router