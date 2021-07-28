// Model Controler
const NivelControler = require('../controllers/NivelControler')

// Router
const router = require('express').Router()

// GET List
router.get('/', async (req, res, next) => {
    try {
        const listaDePessoas = await NivelControler.getAll()
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
        const pessoa = await NivelControler.getOne(id)
        res.status(200).json(pessoa)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// POST new Niveis
router.post('/', async (req, res, next) => {
    try {
        const nivel = req.body
        await NivelControler.createOne(nivel)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// PUT on Niveis by ID
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const nivel = req.body
        await NivelControler.updateOne(id, nivel)
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
        await NivelControler.deleteOne(id)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})
module.exports = router