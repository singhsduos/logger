const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

module.exports = class App {
  constructor (appInit) {
    this.app = express()
    this.httpServer = http.createServer(this.app)
    this.io = new Server(this.httpServer)
    this.middleWare(appInit.middleWares)
    this.port = appInit.port
    this.assets()
    this.socketEvents()
  }

  middleWare (middleWares) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  assets () {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  socketEvents () {
    this.io.on('connection', function (socket) {
      console.log('New connection established: ' + socket.id)
    })
  }

  listen () {
    this.httpServer.listen(this.port, () => {
      console.log(`App listening on http://localhost:${this.port}`)
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
    })
  }
}
