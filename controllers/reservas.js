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

        //const user = await UsersModel.findOne({ _id: req.params.idRes })
        const habitacion = await HabitacionesModel.findOne({ _id: req.params.idHab })
        //const reserva = user.idReserva
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


    /*  try {
         const { idRes, idHab } = req.params
 
         const cartReserva = await ResevaModel.findOne({ _id: req.params.idRes })
         console.log(cartReserva)
         cartReservaUser = cartReserva.idUser
         const habitacion = await HabitacionesModel.findOne({ _id: req.params.idHab })
         const ingresoBase = dayjs(habitacion.ingreso).format('"DD-MM-YYYY')
         const salidaBase = dayjs(habitacion.salida).format('"DD-MM-YYYY"')
         const { ingreso, salida } = req.body
         const fechaIngreso = dayjs(ingreso).format('"DD-MM-YYYY"')
         const fechaSalida = dayjs(salida).format('"DD-MM-YYYY"')
    
 
 
         if (fechaIngreso < fechaSalida) {
 
             const HabiArray = []
             for (let i = 0; i < cartReserva.habitaciones.length; i++) {
                 const habi = cartReserva.habitaciones[i];
                 if (habi._id == req.params.idHab) {
                     HabiArray.push(habi)
                 }
 
             }
 
             if (!(fechaIngreso > ingresoBase && fechaIngreso < salidaBase) && !(fechaSalida > ingresoBase && fechaIngreso < salidaBase) ) {
                 const fechas = await HabitacionesModel.findByIdAndUpdate({ _id: req.params.idHab }, req.body, { new: true })
                 cartReserva.habitaciones.push(habitacion)
                 await reserva.save()
 
                 return res.status(200).json({ msg: 'Habitacion Reservada Correctamente', reserva, status: 200 })
             } else {
                 return res.status(400).json({ mag: 'Habitacion No disponible' })
             }
 
         } else if (fechaIngreso > fechaSalida) {
             return res.status(400).json({ mag: 'La fecha de Ingreso No puede ser Superior a la Salida' })
         } else {
             return res.status(400).json({ mag: 'La fecha de Ingreso No puede ser Igual a la salida' })
         }
 
 
 
 
 
 
     } catch (error) {
         res.status(500).json(error)
     }  */


    /*  try {
 
         const { idRes, idHab } = req.params
         const reservas = await ResevaModel.findOne({ _id: req.params.idRes })
         console.log(reservas)
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
     }  */
}

module.exports = {
    getReservas,
    addReserva
}