const fs = require('fs').promises
const fsWatch = require('fs')
const EventEmitter = require('events')
const chokidar = require('chokidar')
const config = require('config')

class LogService extends EventEmitter {
  constructor (logFilePath) {
    super()
    this.logFilePath = logFilePath
    this.logEntries = []
    this.lastLines = config.get('LINES') || 10
  }

  async fetchLogEntries () {
    try {
      const data = await fs.readFile(this.logFilePath, 'utf8')
      const lines = data.trim().split('\n')
      this.logEntries = lines.slice(-this.lastLines)
      return this.logEntries
    } catch (error) {
      console.error('Error fetching log entries:', error)
      return []
    }
  }

  watchLogFile () {
    fsWatch.watch(this.logFilePath, async (eventType, filename) => {
      if (eventType === 'rename' || eventType === 'change') {
        try {
          await this.fetchLogEntries()
          this.emit('logEntriesUpdated', this.logEntries)
        } catch (error) {
          console.error('Error on file event:', eventType, error)
        }
      }
    })
  }
}

module.exports = LogService
