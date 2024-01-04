const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./conection')
const response = require('./response')

app.use(bodyParser.json( ))

app.get('/', (req, res) => {
      
    response(200, "oke", "Mantap", res)
    // res.send(result)
    
})

app.get('/mhs', (req, res) => {
  const sql = "SELECT * FROM mhs"
  db.query( sql, (error, result) => {  
  response(200, result, "get all data mhs", res)
  // res.send(result)
  })
})

app.get('/mhs/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT nama FROM mhs WHERE id = ${id}`
    console.log('find id: ', req.query.id)
    db.query( sql, (error, result) => {  
        if (error) throw error
    response(200, result, "get data nama berdasar id", res)
    // res.send(result)
    })
})

app.post('/mhs', (req, res) => {
    const { nim, nama, alamat, email} = req.body
    const sql = `INSERT INTO mhs (nim, nama, alamat, email) VALUES ('${nim}','${nama}', '${alamat}', '${email}')`
    db.query(sql, (err, field) => {
      if (err) response(500, "invalid", err.message, res)
      if (field?.affectedRows){
        const data = {
          isSuccess: field.affectedRows,
          id: field.insertId,
        }
        response(200, data, "berhasil tambah data", res)
      }
    })
  })

  app.put('/mhs', (req, res) => {
    const { nim, nama, alamat, email} = req.body
    const sql = `UPDATE mhs SET nama ='${nama}', alamat ='${alamat}', email = '${email}' WHERE nim = '${nim}'`
    db.query(sql, (err, field) => {
      if (err) response(500, "invalid", err.message, res)
      if (field?.affectedRows){
        const data = {
          isSuccess: field.affectedRows,
          message: field.message,
        }
        response(200, data, "update data berhasil", res)
      } else {
        response(200, "user tdk ada", "erorr", res)
      }
    })
  })

  app.delete('/mhs', (req, res) => {
    const { nim } = req.body
    const sql = `DELETE FROM mhs WHERE nim = ${nim}`
    db.query(sql, (err, field) => {
      if (err) response(500, "invalid", err.message, res)
      if (field?.affectedRows){
        const data = {
          isSuccess: field.affectedRows,
          message: field.message,
        }
        response(200, data, "DELETE BERHASIL", res)
      } else {
        response(200, "user tdk ada", "erorr", res)
      }
    })
  })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})