const express = require('express')
const app = express()

app.use(express.json())

const pessoasRouter = require('./routes/listapessoas')
app.use(pessoasRouter)

app.listen(3000, () => {
    console.log("Api rodando em http://localhost:3000")
})