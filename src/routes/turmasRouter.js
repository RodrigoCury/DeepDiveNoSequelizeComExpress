// Model Controler
const TurmaControler = require('../controllers/TurmaControler')

// Router
const router = require('express').Router()

// GET List
router.get('/', async (req, res, next) => {
    try {
        const dataInicial = req.query['data_inicial']
        const dataFinal = req.query['data_final']
        const listaDeTurmas = await TurmaControler.getAll(dataInicial, dataFinal)
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

// GET by ID
router.get('/:id/matriculas', async (req, res, next) => {
    try {
        const id = req.params.id
        const matriculas = await TurmaControler.getRegistrationsPerClass(id)
        res.status(200).json(matriculas)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})


// POST new Turma
router.post('/', async (req, res, next) => {
    try {
        const nivel = req.body
        await TurmaControler.createOne(nivel)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// PUT on Turmas by ID
router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const turma = req.body
        await TurmaControler.updateOne(id, turma)
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
        await TurmaControler.deleteOne(id)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})
module.exports = router