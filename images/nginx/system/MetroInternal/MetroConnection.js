var MetroStream = require('./MetroStream.js')

class MetroConnection {
  constructor () {
    this.buffer = ''
    this.events = {
      data: [],
      die: []
    }

    process.stdin.on('data', (chunk) => {
      // If null terminator, reset buffer
      if (chunk[0] == 0) { this.buffer = ''; return }

      // Add data to input buffer
      this.buffer += chunk

      // If current buffer value is valid JSON, clear buffer and run events
      let body;
      try {
        body = JSON.parse(this.buffer)
      } catch (e) { return }
      this.buffer = ''
      this.events.data.forEach((post) => post(body))
    })
  }

  /* MetroConnection API */

  on (event) {
    return new MetroStream((post, kill) => {
      if (Object.keys(this.events).indexOf(event) !== -1) {
        this.events[event].push(post)
        this.events.die.push(kill)
      }
    })
  }

  command (command) {
    return this.on('data')
               .filter((data) => data.is === command)
               .replace((data) => {
                 delete data.is
                 return data
               })
  }

  send (is, obj) {
    obj.is = is
    process.stdout.write(
      JSON.stringify(obj)
    );
  }
}

module.exports = MetroConnection
