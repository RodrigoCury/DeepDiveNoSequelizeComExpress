// Model Controler
const PessoaControler = require('../controllers/PessoaControler')

// Router
const router = require('express').Router()

// GET List of Active People
router.get('/', async (req, res, next) => {
    try {
        const listaDePessoasAtivas = await PessoaControler.getAllActive()
        res.status(200).json(listaDePessoasAtivas)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// GET List of All People
router.get('/todas', async (req, res, next) => {
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

router.post("/:id/restaurar", async (req, res, next) => {
    try {
        const id = req.params.id
        await PessoaControler.restoreOne(id)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

router.post("/:id/cancelado", async (req, res, next) => {
    try {
        const id = req.params.id
        await PessoaControler.cancelPerson(id)
        res.status(200).json({ mensagem: `Matriculas ref. Estudante ${id} canceladas` })
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

// GET all Registrations from one Person
router.get('/:estudanteId/matriculas', async (req, res, next) => {
    try {
        const { estudanteId } = req.params
        const matriculas = await PessoaControler.getRegistrations(estudanteId)
        res.status(200).json(matriculas)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// GET one Registration from a Person and Registrations ID
router.get('/:estudanteId/matriculas/:matriculaId', async (req, res, next) => {
    try {
        const { estudanteId, matriculaId } = req.params
        const matricula = await PessoaControler.getRegistration(estudanteId, matriculaId)
        res.status(200).json(matricula)
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// Post a new Registration for a Person
router.post('/:estudanteId/matriculas', async (req, res, next) => {
    try {
        const { estudanteId } = req.params
        const matricula = req.body
        await PessoaControler.createRegistration(estudanteId, matricula)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// Update a Registration for a Person
router.put('/:estudanteId/matriculas/:matriculaId', async (req, res, next) => {
    try {
        const { estudanteId, matriculaId } = req.params
        const matricula = req.body
        await PessoaControler.updateRegistration(estudanteId, matriculaId, matricula)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

// Delete a Registration for a Person
router.delete('/:estudanteId/matriculas/:matriculaId', async (req, res, next) => {
    try {
        const { estudanteId, matriculaId } = req.params
        await PessoaControler.deleteRegistration(estudanteId, matriculaId)
        res.status(204).end()
    } catch (error) {
        res.status(400).json({
            mensagem: error.message
        })
    }
})

module.exports = router