const {Schema, model} = require ('mongoose')


const CartServicioSchema = new Schema({
    idUser:{
        type:String
    },
    servicios:[]
})

CartServicioSchema.method.toJSON=function(){
    const {__v, ...cartservicio}=this.toObject()
    return cartservicio
}

const CarServicioModel = model('cartservicio',CartServicioSchema)
module.exports = CarServicioModel