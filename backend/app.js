// External Module
const dotenv = require('dotenv') // dotenv is used to manage environment variables i.e server port
dotenv.config()
const express = require('express');
const cors = require('cors')

// Internal Module
const userRoutes = require('./routes/userRoutes');

const app = express();

// import cors
app.use(cors())
app.use(express.json());

app.use('/', (req, res, next) => { 
    res.send('Hello World')
})

app.use('/users', userRoutes);

module.exports = app