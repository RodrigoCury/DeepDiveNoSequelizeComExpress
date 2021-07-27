// Model Controler
const PessoaControler = require('../controllers/PessoaControler')

// Router
const router = require('express').Router()

// GET List
router.get('/', async (req, res, next) => {
    try {
        const listaDePessoas = await PessoaControler.getAll()
        res.status(200).json(listaDePessoas)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

module.exports = router