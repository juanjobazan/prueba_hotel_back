const {Router} = require('express')
const auth = require('../middleware/auth')
const { getReservas, addReserva } = require('../controllers/reservas')

const router = Router()

router.get('/:id',getReservas)
router.post('/:idRes/:idHab',addReserva)

module.exports=router