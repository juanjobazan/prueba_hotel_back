const express = require ('express')
const {check} = require('express-validator') 
const { getAllServicio, getOneServicio, createServicio, deleteServicio, updateServicio } = require('../controllers/servicios')

const router = express.Router()

router.get('/',getAllServicio)
router.get('/:id',getOneServicio)
router.post('/',[
    check('codigo','Campo Codigo Requerido').notEmpty(),
    check('descripcion','Campo Descripcion Requerido').notEmpty(),
    check('precio','Campo Precio Requerido').notEmpty(),
    check('nombre','Campo Nombre Requerido').notEmpty()
],createServicio)
router.put('/:id',updateServicio)
router.delete('/:id',deleteServicio)

module.exports = router
