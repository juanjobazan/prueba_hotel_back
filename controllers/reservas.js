const ResevaModel = require('../models/reserva')
const HabitacionesModel = require('../models/habitaciones')

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

        const {idRes,idHab}=req.params

        const reservas = await ResevaModel.findOne({id: req.params.idRes})
        const habitacionesExi = await ResevaModel.findOne({habitaciones:{$elemMatch:{_id: idRes}}})
        const prueba = await ResevaModel.find({habitaciones:[{_id:{$eq:idRes} }]})
       
        console.log(prueba)
        console.log(idRes)
        console.log(idHab)

      
     
     
        /* const fechas = await HabitacionesModel.findByIdAndUpdate({ _id: req.params.idHab }, req.body, { new: true })
          const reserva = await ResevaModel.findOne({ _id: req.params.idRes })
          const habitacion = await HabitacionesModel.findOne({ _id: req.params.idHab })
          
  
         
         
      
  
          reserva.habitaciones.push(habitacion)
         
  
          await reserva.save()
       
        
  
  
          res.status(200).json({ msg: 'Habitacion Reservada Correctamente', reserva, status: 200 }) */


    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getReservas,
    addReserva
}