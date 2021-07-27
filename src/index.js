const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

app.get('/teste', (req, res, next) => {
    res.status(200)
    res.send({ mensagem: "OKAY" })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`
        Servidor Subido Com Sucesso
        Escutando na porta ${process.env.PORT || 3000}
        http://localhost:${process.env.PORT || 3000}/
    `)
})