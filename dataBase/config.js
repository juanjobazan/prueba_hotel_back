const mongoose = require('mongoose')

try {
    mongoose.connect(process.env.MONGO_CONNECT)
    .then(()=>console.log('Base de datos en Linea'))

} catch (error) {
    console.log('Servidor ERROR', error)
}