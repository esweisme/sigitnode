const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./conection')
const response = require('./response')

app.use(bodyParser.json( ))

app.get('/', (req, res) => {
    const sql = "SELECT * FROM mhs"
    db.query( sql, (error, result) => {  
    response(200, result, "get all data mhs", res)
    // res.send(result)
    })
})

app.get('/find', (req, res) => {
    const sql = `SELECT nama FROM mhs WHERE id = ${req.query.id}`
    console.log('find id: ', req.query.id)
    db.query( sql, (error, result) => {  
    response(200, result, "get data nama berdasar id", res)
    // res.send(result)
    })
})

app.post('/login', (req, res) => {
    console.log({ requestFromOutside: req.body})
    res.send('berhasil login!!')
  })

app.put("/", (req, res)=>{ })
app.delete("/", (req, res)=>{ })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})