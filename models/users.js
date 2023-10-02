const {Schema, model} = require('mongoose')

const UsersSchema = new Schema({
    user:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type:String,
        require: true
    },
    role:{
        type:String,
        default:'user'
    },
    idCartServicio:{
        type:String
    }
})

const UsersModel = model('users',UsersSchema)

module.exports = UsersModel