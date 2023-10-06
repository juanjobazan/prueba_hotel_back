const express = require('express')
const {check} = require('express-validator')
const {getAllHabitacion, getOneHabitacion, createHabitacion, updateHabitacion, deleteHabitacion}= require('../controllers/habitaciones')

const router=express.Router()


router.get('/',getAllHabitacion)
router.get('/:id',getOneHabitacion)
router.post('/',[
    check('numero','campo Numero requerido').notEmpty(),
    check('nombre','campo Nombre requerido').notEmpty(),
    check('descripcion','campo Descripcion requerido').notEmpty(),
    check('capacidad','campo Capacidad requerido').notEmpty(),
    check('precio','campo Precio requerido').notEmpty()
   
],createHabitacion)
router.put('/:id',updateHabitacion)
router.delete('/:id',deleteHabitacion)

module.exports = router