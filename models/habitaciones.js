const  {Schema, model} = require ('mongoose')


const HabitacionesSchema  = new Schema({
    numero:{
        type:Number,
        required:true,
        unique:true
    },
    nombre:{
        type:String,
        required:true,
    },
    descripcion:{
        type:String,
        required:true,
    },
    capacidad:{
        type:Number,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    imagen:{
        type:String,
        default:''
    }

})

const HabitacionesModel = model('habitaciones',HabitacionesSchema)

module.exports = HabitacionesModel