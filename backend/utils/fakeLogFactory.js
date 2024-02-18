const fs = require('fs')
const path = require('path')
const moment = require('moment')
const logFilePath = path.join('./', 'serverLogs.log')

const FakeLogs = () => {
  const originalTimestamp = new Date()
  const formattedTime = moment(originalTimestamp).format('YYYY-MM-DD HH:mm:ss')
  const newLogEntry = formattedTime + ': New log generated. ' + '\n'
  fs.appendFile(logFilePath, newLogEntry, err => {
    if (err) {
      console.error('Failed to append to the log file:', err)
      return
    }
    // console.log('New log entry added successfully!')
  })
}

exports.FakeLogs = FakeLogs
