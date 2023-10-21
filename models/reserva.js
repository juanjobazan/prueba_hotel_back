const { Schema, model } = require('mongoose')

const ReservaSchema = new Schema({
    idUser: {
        type: String
    },
    
   
    habitaciones: []
})


ReservaSchema.method.toJSON = function () {
    const { __v, ...reserva } = this.toObjet()
    return reserva
}

const ResevaModel = model('reserva', ReservaSchema)
module.exports = ResevaModel