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
        default:'https://res.cloudinary.com/ddxah5v71/image/upload/w_200,h_200,c_limit,e_blur:400,o_90,b_black/l_text:arial_80:®,ar_1:1,c_lfill,o_60,co_rgb:ffffff,b_rgb:000000,r_max/v1697857361/NOSSA-logo-wh-29_ypzo3j.png'
        
        
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