const CarServicioModel = require('../models/cartServicio')
const ServiciosModel = require('../models/servicios')

const getCartServicios = async (req, res) => {
    try {
        const cartServicio = await CarServicioModel.findOne({ _id: req.params.id })
        res.status(200).json({ cartServicio })

    } catch (error) {
        res.status(500).json(error)
    }
}

const addServicioCart = async (req, res) => {
    try {
        const cartServicio = await CarServicioModel.findOne({ _id: req.params.idCartS })
        const servicio = await ServiciosModel.findOne({ _id: req.params.idServ })
        const servArray = []


        for (let i = 0; i < cartServicio.servicios.length; i++) {
            const serv = cartServicio.servicios[i];
            if (serv._id == req.params.idServ) {
                servArray.push(serv)
            }
        }
        if (servArray.length > 0) {
            return res.status(400).json({ msg: 'el Servicio ya existe en el carrito' })
        }
        cartServicio.servicios.push(servicio)

        await cartServicio.save()
        res.status(200).json({ msg: 'Servicio Cargado correctamente', cartServicio, status: 200 })

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    getCartServicios,
    addServicioCart
}