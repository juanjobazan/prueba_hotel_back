const HabitacionesModel = require('../models/habitaciones')
const { validationResult } = require('express-validator')


const getAllHabitacion = async (req, res) => {
    try {
        const getHabitaciones = await HabitacionesModel.find()
        res.status(200).json(getHabitaciones)
    } catch (error) {
        throw new Error('No se pudo Enviar las Habitaciones', error)
    }
}

const getOneHabitacion = async (req, res) => {
    try {
        const getHabitacion = await HabitacionesModel.findOne({ _id: req.params.id })
        res.status(200).json(getHabitacion)

    } catch (error) {
        throw new Error('No se pudo Enviar las Habitaciones', error)
    }
}

const createHabitacion = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array() })
    }
    try {
        const { numero, nombre, descripcion, capacidad, precio, imagen } = req.body
        const HabitacionExist = await HabitacionesModel.findOne({ numero })
        if (HabitacionExist) {
            return res.status(400).json({ msg: 'Esta Habitacion YA existe' })
        }
        const objHabitacion = {
            numero,
            nombre,
            descripcion,
            capacidad,
            precio,
            imagen
        }
        const newHabitacion = new HabitacionesModel(objHabitacion)
        await newHabitacion.save()
        res.status(200).json({ msg: 'La Habitacion se Creo Correctamente', newHabitacion })

    } catch (error) {
        throw new Error('No se pudo crear la Habitacion', error)
    }
}

const updateHabitacion = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array() })
    }
    try {
        const updateHabi = await HabitacionesModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json({ msg: 'Habitacion modificada correctamente', updateHabi, status: 200 })
    } catch (error) {
        throw new Error('No se pudo Modificar la Habitacion', error)
    }
}

const deleteHabitacion = async (req, res) => {
    try {
        const HabitacionExist = await HabitacionesModel.findOne({ _id: req.params.id })
        if (HabitacionExist) {
            await HabitacionesModel.findByIdAndDelete({ _id: req.params.id })
            res.status(200).json({ msg: 'La Habitavion fue Borrada con Exito' })
        } else {
            res.status(400).json({ msg: 'La Habitacion No existe en la Base de Datos' })
        }
    } catch (error) {
        throw new Error('No se pudo Eliminar la Habitacion', error)
    }
}


module.exports = {
    getAllHabitacion,
    getOneHabitacion,
    createHabitacion,
    updateHabitacion,
    deleteHabitacion
}