const express = require('express')
const app = express()

const met = require('./met.js')


const port = process.env.PORT || 3000

app.get('', function(req, res) {
    res.send({
      greeting: 'Examen 2 - JCGA'
    })
  })

app.get('/students/:id', function(req, res) {
    if(req.params.id == 'A00813022') {
        res.send({
            "id": "A00813022",
            "fullname": "Juan Carlos González-Álvarez",
            "nickname": "Strider",
            "age": 87
    })
    } else {
        res.send({
            "error" : "matricula no encontrada, boi"
        })
    }
})

app.get('/met', function(req, res) {
    if(!req.query.search) {
      res.send({
        error: 'Debes de buscar algo, fam'
      })
    }
    met.met(req.query.search, function(error, data) {
        if (error) {
          return res.send({
            error: error
          })
        } else {
            met.object(data, function(error, data) {
                if(error) {
                    return res.send({
                        error:error
                    })
                } else {
                    data.searchTerm = req.query.search
                    res.send({
                        data: data
                    })
                }
            })
        }
    })
  })
  
  app.get('*', function(req, res) {
    res.send({
      error: 'Ruta no valida :('
    })
  })

  app.listen(port, function() {
    console.log('Aqui escuchando')
  })
  