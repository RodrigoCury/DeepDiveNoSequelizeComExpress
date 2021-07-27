// BodyParsers
const urlencoded = require('express').urlencoded
const json = require('express').json

// Routers
const pessoasRouter = require('./pessoasRouter')

module.exports = app => {
    app.use(urlencoded({ extended: true }))
    app.use(json({ extended: true }))

    app.use('/pessoa', pessoasRouter)
}