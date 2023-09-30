const jwt = require('jsonwebtoken')
const UsersModel = require('../models/users')

module.exports =async (req,res,nex) =>{
   try {

    const token = req.header('auth').replace('Bearer','')
    const verify= jwt.verify(token, process.env.SECRET_KEY)
    const userExist = await UsersModel.findOne({_id: verify.user.idUser})

    if(userExist){
        req.idUser = userExist._id
        nex()
    }else{
        return res.status(400).json({msg:'Problemas con el Token'})
    }
   } catch (error) {
    console.log(error)
    return res.status(500).json({msg:'Problemas con el Token', error})
   }
}