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

// GET by ID
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const pessoa = await PessoaControler.getOne(id)
        res.status(200).json(pessoa)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// POST new Pessoa
router.post('/', async (req, res, next) => {
    try {
        const pessoa = req.body
        await PessoaControler.createOne(pessoa)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// PUT on Pessoas by ID
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const pessoa = req.body
        await PessoaControler.updateOne(id, pessoa)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await PessoaControler.deleteOne(id)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})
module.exports = router