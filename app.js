const express = require('express')
const bodyParser = require('body-parser')

// call express as a function to create app
const app = express()

// add bodyParser middleware to parse incoming JSON bodies
app.use(bodyParser.json())

// listen to get requests
app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

// listen on port 3000
app.listen(3000)
