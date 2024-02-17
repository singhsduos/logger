const fs = require('fs').promises
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
    chokidar
      .watch(this.logFilePath, { ignoreInitial: true })
      .on('all', async event => {
        if (event === 'add' || event === 'change') {
          await this.fetchLogEntries()
          this.emit('logEntriesUpdated', this.logEntries)
        }
      })
  }
}

module.exports = LogService
