const ResevaModel = require('../models/reserva')
const HabitacionesModel = require('../models/habitaciones')
const dayjs = require('dayjs')


const getReservas = async (req, res) => {
    try {
        const reserva = await ResevaModel.findOne({ _id: req.params.id })
        res.status(200).json({ reserva })
    } catch (error) {
        res.status(500).json(error)
    }
}

const addReserva = async (req, res) => {

    try {

        const { idRes, idHab } = req.params
        const reservas = await ResevaModel.findOne({ _id: req.params.idRes })
        const habitacionesReserva = reservas.habitaciones
        const findHabitacion = habitacionesReserva.find(obj => obj._id == idHab)
        const ingresoBase = findHabitacion.ingreso
        const salidaBase = findHabitacion.salida

        const { ingreso, salida } = req.body
        const fechaIngreso = (ingreso)
        const fechaSalida = (salida)

        if (fechaIngreso < fechaSalida) {
            if (!findHabitacion) {
                const fechas = await HabitacionesModel.findByIdAndUpdate({ _id: req.params.idHab }, req.body, { new: true })
                const reserva = await ResevaModel.findOne({ _id: req.params.idRes })
                const habitacion = await HabitacionesModel.findOne({ _id: req.params.idHab })

                reserva.habitaciones.push(habitacion)

                await reserva.save()


             return   res.status(200).json({ msg: 'Habitacion Reservada Correctamente', reserva, status: 200 })

               

            } else {
                if (!(fechaIngreso > ingresoBase && fechaIngreso < salidaBase) && !(fechaSalida > ingresoBase && fechaIngreso < salidaBase)) {
                    const fechas = await HabitacionesModel.findByIdAndUpdate({ _id: req.params.idHab }, req.body, { new: true })
                    const reserva = await ResevaModel.findOne({ _id: req.params.idRes })
                    const habitacion = await HabitacionesModel.findOne({ _id: req.params.idHab })
    
                    reserva.habitaciones.push(habitacion)
    
                    await reserva.save()
    
    
                return    res.status(200).json({ msg: 'Habitacion Reservada Correctamente', reserva, status: 200 })
                   
                } else {
                    return res.status(400).json({ mag: 'Habitacion No disponible' })
                }

             
            }
            

        } else if (fechaIngreso > fechaSalida) {
            return res.status(400).json({ mag: 'La fecha de Ingreso No puede ser Superior a la Salida' })
        } else {
            return res.status(400).json({ mag: 'La fecha de Ingreso No puede ser Igual a la salida' })
        }



    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getReservas,
    addReserva
}