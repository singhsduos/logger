const App = require('./app')
const config = require('config')
const cors = require('cors')
require('express-async-errors')


const app = new App({
  port: config.PORT || 30000,
  middleWares: [cors()],
})

process.on('unhandledRejection', ex => {
  throw ex
})

app.listen()
