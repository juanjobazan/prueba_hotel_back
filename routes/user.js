const express = require('express')
const {check} = require('express-validator') 
const { getAllUser, getOneUser, createUser, updateUser, deleteUser, userLogin, userLogaut } = require('../controllers/users')
const router = express.Router()

router.get('/logaut',userLogaut)
router.get('/',getAllUser)
router.get('/:id',getOneUser)
router.post('/',[
    check('user','Campo usuario es requerido').notEmpty(),
    check('password','Campo contraseña es requerido').notEmpty(),
    check('password','Minimo 8 Caracteres').isLength({min:8}),
    check('email','Campo email es requerido').notEmpty()
],createUser)
router.post('/:login',userLogin)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)

module.exports = router