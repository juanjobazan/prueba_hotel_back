const ResevaModel = require('../models/reserva')
const HabitacionesModel = require('../models/habitaciones')
const dayjs = require('dayjs')
const UsersModel = require('../models/users')



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

     
        const habitacion = await HabitacionesModel.findOne({ _id: req.params.idHab })
       
        const cartReserva = await ResevaModel.findOne({ _id: req.params.idRes })
       
        const habitacionesReserva = cartReserva.habitaciones
        
        const findHabitacion = habitacionesReserva.find(obj => obj._id == idHab) || []
        
        const fechasBase = (findHabitacion.reservas) || []
        console.log(fechasBase)
        const { ingreso, salida } = req.body
      
        const fechaIngreso = ingreso
        const fechaSalida = salida
       
        


        if (fechaIngreso < fechaSalida) {
            if (!findHabitacion) {
                cartReserva.habitaciones.push(habitacion)
                habitacion.reservas.push(fechaIngreso, fechaSalida)

                await cartReserva.save()

                return res.status(200).json({ msg: 'Habitacion Reservada Correctamente', cartReserva, status: 200 })

            } else if (!(fechaIngreso > fechasBase[0] && fechaIngreso < fechasBase[fechasBase.length - 1]) && !(fechaSalida > fechasBase[0] && fechaIngreso < fechasBase[fechasBase.length - 1])) {
                cartReserva.habitaciones.push(habitacion)
                habitacion.reservas.push(fechaIngreso, fechaSalida)
                await cartReserva.save()

                return res.status(200).json({ msg: 'Habitacion Reservada Correctamente', cartReserva, statusbar: 200 })

            } else {
                return res.status(400).json({ msg: 'Habitacion NO Disponible' })
            }
        } else {
            return res.status(400).json({ msg: 'La Fecha de Ingreso NO puede ser Superior a La de Salida' })
        }


    } catch (error) {
        res.status(500).json(error)
    }


    }

module.exports = {
    getReservas,
    addReserva
}