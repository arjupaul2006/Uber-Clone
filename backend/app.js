// External Module
const dotenv = require('dotenv') // dotenv is used to manage environment variables i.e server port
dotenv.config()
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')

// Internal Module
const userRoutes = require('./routes/userRoutes');
const captainRoutes = require('./routes/captainRoutes')

const app = express();

// import cors
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

app.use('/', (req, res, next) => { 
    res.send('Hello World')
})


module.exports = app