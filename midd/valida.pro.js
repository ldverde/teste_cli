const Ajv = require('ajv')
const ajv = new Ajv()
const addFormats = require("ajv-formats")
const produtoSchema = require('../schema/schema')

addFormats(ajv)

function valida(req, res, next){
    const produto = req.body
    if(produto.userId){
        produto.userId = Number(produto.userId)
}
    const validate = ajv.compile(produtoSchema)
    const valid = validate(produto)
    if (valid){
        next()
    }else{
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors})
    }
}

module.exports = valida