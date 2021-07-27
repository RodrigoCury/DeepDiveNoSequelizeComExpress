/**
 * Imports
 */

// Env Vars
require('dotenv').config()

// Libs
const express = require('express')

// Routes 
const routes = require('./routes')


/**
 * Setup
 */

// App
const app = express()

// Routing
routes(app)

/**
 * Serving
 */
app.listen(process.env.PORT || 3000, () => {
    console.log(`
        Servidor Subido Com Sucesso
        Escutando na porta ${process.env.PORT || 3000}
        http://localhost:${process.env.PORT || 3000}/
    `)
})