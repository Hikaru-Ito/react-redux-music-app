require('babel-polyfill')
require('babel-register')
const http = require('http')

if(process.env.NODE_ENV == 'production') {
  console.log('---- Launch Production Mode ----')
} else {
  console.log('---- Launch Development Mode ----')
}
const app = require('./server').app
const server = http.createServer(app)
const port = process.env.PORT || '1089'

server.listen(port)
console.log(`server start => port:${port}`)
