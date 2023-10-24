const multer = require('multer')
const cloudinary = require('../utils/cloudinaryConfig')
const HabitacionesModel = require("../models/habitaciones")

const createImage = async (req, res) => {
    console.log(req.file.path)
    const habitacion = await HabitacionesModel.findOne({ _id: req.params.idHab })
    const results = await cloudinary.uploader.upload(req.file.path);
    const urlImage = results.secure_url
    habitacion.imagen = urlImage

    const habitacionActualizado = await HabitacionesModel.findByIdAndUpdate({ _id: req.params.idHab }, habitacion, { new: true })
    res.status(200).json(habitacionActualizado)
}

module.exports = {
    createImage
}