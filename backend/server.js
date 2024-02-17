const App = require('./app')
const config = require('config')
const cors = require('cors')
const { FakeLogs } = require('./utils/fakeLogFactory')
require('express-async-errors')

const app = new App({
  port: config.PORT || 30000,
  middleWares: [cors()]
})

process.on('unhandledRejection', ex => {
  console.error('Unhandled Rejection:', ex)
  throw ex
})

app.listen()


setInterval(() => {
  FakeLogs()
}, 3500)
