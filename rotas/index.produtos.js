const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('pages/produtos', {layout: 'layouts/layout-produtos.ejs' })
})

module.exports = router

// const frutas = [
//     {nome:"maçã", preco:1.50},
//     {nome:"pera" , preco :2}
// ]('pages/produtos', {layout: 'layouts/layout-produtos' })