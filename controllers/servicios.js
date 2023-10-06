const bcrypt = require('bcryptjs')
const ServiciosModel = require('../models/servicios')
const { validationResult } = require('express-validator')

const getAllServicio = async (req, res) => {
    try {
        const getServicios = await ServiciosModel.find()
        res.status(200).json(getServicios)
    } catch (error) {
        throw new Error('No se pudo Enviar los Productos', error)
    }
}

const getOneServicio = async (req, res) => {
    try {
        const getServicio = await ServiciosModel.findOne({ _id: req.params.id })
        res.status(200).json(getServicio)
    } catch (error) {
        throw new Error('No se pudo Enviar el Producto', error)
    }
}

const createServicio = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array() })
    }
    try {
        const { codigo, descripcion, imagen, precio, nombre } = req.body
        const servicioExist = await ServiciosModel.findOne({ codigo })
        if (servicioExist) {
            return res.status(400).json({ msg: 'Este Servicio Ya Existe' })
        }
        const objServicio = {
            codigo,
            descripcion,
            imagen,
            precio,
            nombre
        }
        const newServicio = new ServiciosModel(objServicio)
        await newServicio.save()
        res.status(200).json({ msg: 'El servicio se Creo correstamente', newServicio })
    } catch (error) {
        throw new Error('No se pudo crear el Producto', error)
    }
}

const updateServicio = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ msg: errors.array() })
    }
    try {
        const updateServi = await ServiciosModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json({ msg: 'Producto Modificado Correctamente', updateServi, status: 200 })
    } catch (error) {
        throw new Error('No se pudo Modificar el Producto', error)
    }
}

const deleteServicio = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({msg: errors.array()})
    }
    try {
        await ServiciosModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({msg:'Se Borro Correctamente el Producto', status:200})
    } catch (error) {
        throw new Error('No se pudo Eliminar el Producto', error)
    }
}


module.exports = {
    getAllServicio,
    getOneServicio,
    createServicio,
    updateServicio,
    deleteServicio
}