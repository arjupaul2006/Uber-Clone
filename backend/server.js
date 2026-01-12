// Core Module
const http = require('http')

// Internal Module
const app = require('./app')
const port = process.env.PORT || 3000   // 4000 || 3000

// External Modules
const { default: mongoose } = require('mongoose');

// mongoDB connection string
const DB_PATH =
  "mongodb+srv://ArjuPaul:root@arjupaul.abtumje.mongodb.net/uber?retryWrites=true&w=majority&appName=ArjuPaul";

const server = http.createServer(app)

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongoose")
    server.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongoose: ", err);
  });