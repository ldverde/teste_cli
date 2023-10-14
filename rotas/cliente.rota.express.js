const express = require('express')
const router = express.Router()
const clienteMid = require('../midd/valida.cli')
const { Cliente } = require('../models')

// var  multer = require ( 'multer' )
// const path = require('path')

const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


router.post('/',clienteMid)
router.put('/:id',clienteMid)

router.get('/', async (req, res) => {
    const clientess = await Cliente.findAll()
    res.json({clientes: clientess})
})

router.get('/:id', async (req, res) => {
    const client = await Cliente.findByPk(req.params.id)
    res.json({clientes: client})
})



router.put('/', async (req, res) => {

    const id = req.query.id
    const cliente = await Cliente.findByPk(id)

    if (cliente){
        cliente.email = req.body.email
        cliente.senha = req.body.senha
        await cliente.save()
        res.json({msg: "Cliente atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Cliente não encontrado!"})
    }
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const cliente = await Cliente.findByPk(id)
    if (cliente){
        await cliente.destroy()
        res.json({msg: "Cliente deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Cliente não encontrado!"})
    }
})


router.post('/', async (req,res) =>{
    const senha = req.body.senha
    const salt = await bcrypt.genSalt(10)
    const senhaCripto = await bcrypt.hash(senha,salt)
    const cliente = {email:req.body.email,senha:senhaCripto}
    const clienteObj = await Cliente.create(cliente);
    res.json({ msg: "Cliente adicionado com sucesso!", userId: clienteObj.id });
})

router.post('/login', async (req,res) => {
    const email = req.body.email
    const senha = req.body.senha
    const cliente = await Cliente.findOne({
        where:{
            email : email
        },
    })
    
    if(cliente && (await bcrypt.compare (senha, cliente.senha))){
        const payload = {
            email: cliente.email,
            senha: cliente.senha
        }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
    res.json({accesstoken : token})
    }else{
        res.status(403).json({msg: "cliente ou senha invalidos"})
    }
});




// function prepararResultado(post){
//     const result = Object.assign({}, post)
//     if (result.createdAt) delete result.createdAt
//     if (result.updatedAt) delete result.updatedAt
//     if (result.userId) delete result.userId
//     if (result.Usuario){
//             if (result.Usuario.senha) delete result.Usuario.senha
//             if (result.Usuario.createdAt) delete result.Usuario.createdAt
//             if (result.Usuario.updatedAt) delete result.Usuario.updatedAt
//     }
//     return result
// }

module.exports = router
