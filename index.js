require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
//middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api', require('./routes'))

//Database
require('./dataBase/config')

app.listen(3000,()=>
    console.log('Servidor Online')
)
