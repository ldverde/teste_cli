const express = require('express')
const router = express.Router()
const produtoMid = require('../midd/valida.pro')
const { Produto } = require('../models')
var  multer = require ( 'multer' )
const path = require('path')
const bcrypt = require('bcrypt')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
         cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)) 
    }
})

const fileFilter = (req, file, cb) => {
    const extensoes = /png|jpeg|jpg/i
    if (extensoes.test(path.extname(file.originalname))){
            cb(null, true)
    }else{
            return cb('Arquivo não suportado. Apenas png,jpg e jpeg são suportados.')
    }
}

var  upload = multer ( {storage: storage , fileFilter: fileFilter} )


router.post('/',produtoMid)
router.put('/:id',produtoMid)

router.post('/:id/upload', upload.single ( 'foto' ), async (req, res) => {
    console.log(req.file)
    const id = req.params.id
    const produto = await Produto.findByPk(id)

    if(produto){
        produto.foto = `/static/uploads/${req.file.filename}`
        await produto.save()
        res.json({msg: 'upload enviado com sucesso'})
    }else{
        res.status(400).json({msg: "Post não encontrado!"})
    }
})

router.get('/', async (req, res) => {
    const produtoss = await Produto.findAll()
    res.json({produtos: produtoss})
})

router.get('/:id', async (req, res) => {
    const produt = await Produto.findByPk(req.params.id)
    res.json({produtos: produt})
})



router.put('/', async (req, res) => {

    const id = req.query.id
    const produto = await Produto.findByPk(id)

    if (produto){
        produto.nome = req.body.nome
        produto.preco = req.body.preco
        await produto.save()
        res.json({msg: "Produto atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: "Produto não encontrado!"})
    }
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const produto = await Produto.findByPk(id)
    if (produto){
        await produto.destroy()
        res.json({msg: "Produto deletado com sucesso!"})
    }else{
        res.status(400).json({msg: "Produto não encontrado!"})
    }
})

router.post('/', async (req, res) => {



    const produto = await Produto.create(req.body)
    res.json({msg: "Produto adicionado com sucesso!"})



})

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