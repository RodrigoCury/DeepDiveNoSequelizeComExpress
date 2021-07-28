// Model Controler
const TurmaControler = require('../controllers/TurmaControler')

// Router
const router = require('express').Router()

// GET List
router.get('/', async (req, res, next) => {
    try {
        const listaDeTurmas = await TurmaControler.getAll()
        res.status(200).json(listaDeTurmas)
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
        const turmas = await TurmaControler.getOne(id)
        res.status(200).json(turmas)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await TurmaControler.deleteOne(id)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})
module.exports = router