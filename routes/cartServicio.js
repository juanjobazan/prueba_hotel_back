const {Router} = require('express')
const auth = require('../middleware/auth')
const { getCartServicios, addServicioCart } = require('../controllers/cartServicios')
const router = Router()

router.get('/:id',getCartServicios)
router.post('/:idCartS/:idServ',addServicioCart)

module.exports=router