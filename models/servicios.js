const {Schema, model} = require('mongoose')

const ServiciosSchema = new Schema({
    codigo:{
        type:Number,
        required:true,
        unique:true
    },
    descripcion:{
        type: String,
        required:true
    },
    imagen:{
        type:String,
        default:''
        
        
    },
    precio:{
        type:Number,
        require:true
    },
    nombre:{
        type:String,
        required:true
    }
})

const ServiciosModel = model('servicios',ServiciosSchema)

module.exports = ServiciosModel