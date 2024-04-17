const express = require('express')
const router = express.Router() 


const listapessoas = [
    {
        id: 2,
        nome: "Siclano",
        idade: 20,
        email: "siclano@email.com",
        telefone: "61900010002"
    },
    {
        id: 2,
        nome: "Beltrano",
        idade: 21,
        email: "beltrano@email.com",
        telefone: "61911210002"
    }
]

//- Recuperar todas as pessoas.
router.get('/pessoas', (req, res) => {
    res.json(listapessoas)
})

//- Recuperar uma pessoa específica por meio de seu identificador.
router.get('/pessoas/:id', (req,res) =>{
    const id = req.params.id
    const pessoas = listapessoas.find(pessoas => pessoas.id == id)
    if (pessoa) {
        return res.json(pessoas)
    }
    return res.status(404).json({mensagem: "Essa pessoa não foi encontrada!"})
})

//- Adicionar uma nova pessoa.
router.post('/pessoas', (req, res) => {
    const dadospessoa = req.body
    if(!dadospessoa.nome || !dadospessoa.idade || !dadospessoa.email || !dadospessoa.telefone){
        return res.status(400).json({mensagem: "Por Favor, preencha todos os campos! "})
    }
const novapessoa ={
    id: Math.round(Math.random() * 1000),
    nome: dadospessoa.nome,
    idade: dadospessoa.idade,
    email: dadospessoa.email,
    telefone: dadospessoa.telefone
}

listapessoas.push(novapessoa)

res.status(201).json({
    mensagem: "Nova pessoa cadastrada com sucesso!",
    novapessoa
    }
)
})

//- Atualizar uma pessoa existente com base em seu identificador.
router.put('/pessoas/:id', (req, res) => {
    const id = req.params.id
    const novosdados = req.body

    if(!novosdados.nome || !novosdados.idade || !novosdados.email || !novosdados.telefone){
        return res.status(400).json({mensagem: "Todos os campos são obrigatorios!"})
    }

    const index = listapessoas.findIndex(pessoas => pessoas.id == id)
    if (index == -1){
        return res.status(400).json({mensagem: "Pessoa não encontrada!"})
    }
    const dadosatualizado = {
        id: Number(id),
        nome: novosdados.nome,
        idade: novosdados.idade,
        email: novosdados.email,
        telefone: novosdados.telefone
    }
    listapessoas[index] = dadosatualizado

    res.json({
        mensagem: "Dados alterados com sucesso",
        dadosatualizado
    })
})

//Remover uma tarefa da lista com base em seu identificador.

router.delete('/pessoas/:id', (req, res)=> {
    const id = req.params.id
    const index = listapessoas.findIndex(pessoas => pessoas.id == id)
    if (index == -1){
        return res.status(404).json({mensagem: "Pessoa não encontrada!"})
    }
    listapessoas.splice(index,1)
    res.json({mensagem: "Pessoa excluida co sucesso!"})
})


module.exports = router