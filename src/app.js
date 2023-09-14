const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')

//mongoose.connect('mongodb+srv://app_departamento_pessoal:UpFVZTDnO52JG2OM@cluster0.ziiwzun.mongodb.net/api-departamento-pessoal?retryWrites=true&w=majority')
mongoose.connect('mongodb://fiap:123456@localhost:27017/admin')
app.use(express.urlencoded({
    extended: true
}))

//registro da model
require('./models/departamentop')

//rotas
const departamentoRouter = require('./routers/departamentop-route')
const index = require('./routers/index')

app.use('/', index)
app.use('/departamentop', departamentoRouter)

module.exports = app;