const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ads'
})

con.connect((err) => {
    if(err){
        console.log(err)
        throw err
    }

    console.log("Connection with mysql established")
})

const app = express()
app.use(express.json())

app.use(cors({ origin: "*" }))

app.get('/modelo', async(req, res) => {
    con.query('SELECT * FROM modelo', (err, result) => {
        if(err){
            return res.json({error: err})
        }
        
        return res.status(200).json(result)
    })
})

app.post('/modelo', async(req, res) => {
    const modelo = req.body

    const sql = `INSERT INTO modelo(ano, descricao) VALUES(${modelo.ano}, '${modelo.descricao}')`

    con.query(sql, async(err, result) => {
        if(err){
            return res.json({error: err})
        }

        return res.status(201).json({err: null})
    })
})

app.get('/carro', (req, res) => {
    con.query('SELECT * FROM carro', (err, result) => {
        if(err){
            return res.json({error: err})
        }

        return res.status(200).json(result)
    })
})

app.post('/carro', async(req, res) => {
    const carro = req.body

    const sql = `INSERT INTO carro(codigo_modelo, cor, descricao, observacoes) VALUES(${carro.codigo_modelo}, '${carro.cor}', '${carro.descricao}', '${carro.observacoes}')`

    con.query(sql, async(err, result) => {
        if(err){
            return res.json({error: err})
        }

        return res.status(201).json({err: null})
    })
})

app.listen(9000, () => {
    console.log('Server running on port 9000')
})