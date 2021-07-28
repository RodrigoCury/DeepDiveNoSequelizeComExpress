// BodyParsers
const urlencoded = require('express').urlencoded
const json = require('express').json

// Routers
const pessoasRouter = require('./pessoasRouter')
const niveisRouter = require('./niveisRouter')
const turmasRouter = require('./turmasRouter')

module.exports = app => {
    app.use(urlencoded({ extended: true }))
    app.use(json({ extended: true }))

    app.use('/pessoa', pessoasRouter)
    app.use('/nivel', niveisRouter)
    app.use('/turma', turmasRouter)
}