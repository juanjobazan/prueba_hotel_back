const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UsersModel = require('../models/users')
const { validationResult } = require('express-validator')
const CarServicioModel = require('../models/cartServicio')
const ResevaModel = require('../models/reserva')


const getAllUser = async (req, res) => {
    try {
        const getUsers = await UsersModel.find()
        res.status(200).json(getUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getOneUser = async (req, res) => {
    try {
        const getUser = await UsersModel.findOne({ _id: req.params.id })
        res.status(200).json(getUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createUser = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array() })
    }
    try {
        const { user, password, email } = req.body

        const userExist = await UsersModel.findOne({ user })

        if (userExist) {

            return res.status(400).json({ mag: 'Este usuario ya Existe' })
        }



        let salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(password, salt);

        
        const newUser = new UsersModel(req.body)
        const newCartServicio = new CarServicioModel()
        const newReserva = new ResevaModel()  

        newUser.idCartServicio = newCartServicio._id
        newCartServicio.idUser = newUser._id
        newUser.idReserva = newReserva._id
        newReserva.idUser= newUser._id


        const objUser = {
            user,
            password: req.body.password,
            email,
        }

        await newUser.save()
        await newCartServicio.save()
        await newReserva.save()
        res.status(201).json({ msg: 'Usuario Creado con Exito', newUser })
    } catch (error) {
        res.status(500).json(error)
    }

}

const updateUser = async (req, res) => {
    try {
        const updateUser = await UsersModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json({ msg: 'usuario Actualizado', updateUser, status: 200 })
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const userExist = await UsersModel.findOne({ _id: req.params.id })
        if (userExist) {
            await UsersModel.findByIdAndDelete({ _id: req.params.id })
            res.status(200).json({ msg: 'El usuario fue borrado con exito' })
        } else {
            res.status(400).json({ msj: 'El usuario no existe en la BD' })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

/*Login */
const userLogin = async (req, res) => {
    try {
        const { user, password } = req.body

        const userExist = await UsersModel.findOne({ user })

        if (!userExist) {
            return res.status(400).json({ msj: 'Usuario y/o Contraseña incorrecta' })
        }

        const passCheck = bcrypt.compareSync(password, userExist.password)
        const payload = {
            user: {
                idUser: userExist._id,
                roleUser: userExist.role
            }
        }

        if (passCheck) {
            const token = jwt.sign(payload, 'hotel')
            res.status(200).json({ token, role:userExist.role,id:userExist._id })
        }else{
            res.status(400).json({msg:'Usuario y/o Contraseña Incorrecta'})
        }



    } catch (error) {
        res.status(500).json(error)
    }
}


const userLogaut = async(req,res)=>{
    try {
        const user = await UsersModel.findOne({_id: req.idUser})
        await UsersModel.findByIdAndUpdate({_id: req.idUser}, user,{new:true})
        res.status(200).json({msg:'Usuario Deslogueado'})
    } catch (error) {
      res.status(400).json(error)  
    }

}



module.exports = {
    getAllUser,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    userLogin,
    userLogaut
}