const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

var dailyconsumption =[]
var numbersArray = []
var datesArray= []

for (let i=0 ; i<dailyconsumption.length; i++) {
    numbersArray= numbersArray.push(dailyconsumption[i].total)
    datesArray=datesArray.push(dailyconsumption[i].ID)
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(bodyParser.json())
app.listen(8080)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

  app.get('/data', (req, res) => {
    res.json(dailyconsumption)
   })


  app.post('/data', (req, res) => {  
   dailyconsumption=req.body
   console.log(req.body)
    res.send('Success')
    })

 