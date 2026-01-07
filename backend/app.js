// External Module

// dotenv is used to manage environment variables i.e server port
const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const cors = require('cors')

const app = express();

// import cors
app.use(cors())

app.use('/', (req, res, next) => { 
    res.send('Hello World')
})

module.exports = app