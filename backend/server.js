// Core Module
const http = require('http')

// Internal Module
const app = require('./app')
const port = process.env.PORT || 3000   // 4000 || 3000

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`)
})