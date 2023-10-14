const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
const cliSchema = require('../schema/schema.cliente')

addFormats(ajv)

function validat(req, res, next){
    const cliente = req.body
    if(cliente.userId){
        cliente.userId = Number(cliente.userId)
}
    const validate = ajv.compile(cliSchema)
    const valid = validate(cliente)
    if (valid){
        next()
    }else{
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors})
    }
}

module.exports = validat