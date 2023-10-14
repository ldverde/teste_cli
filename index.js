const express = require('express')
const rotaProduto = require('./rotas/rotas_express')
var expressLayouts = require('express-ejs-layouts')
const indexRoute = require('./rotas/index.produtos')
const rotaCliente = require('./rotas/cliente.rota.express')
const helmet = require('helmet');

require('dotenv').config()
const app = express()

app.use(helmet());
app.use(express.json())

app.use('/api/produtos', rotaProduto)
app.use('/api/clientes', rotaCliente)

app.use('/', indexRoute)

app.use('/static', express.static('public'))

app.set('view engine', 'ejs')

app.set('layout', 'layouts/layout')


app.use(expressLayouts)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`iniciando no ambiente ${process.env.NODE_ENV}`)
    console.log(`Servidor pronto na porta ${PORT}`)
})



// app.get('/nao',(req,res) => {
//     res.render('pages/index')
// })
