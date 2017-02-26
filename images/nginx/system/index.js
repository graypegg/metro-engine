#!/usr/bin/env node

class MetroConnection {
  constructor () {
    this.buffer = ''
    this.events = {
      data: []
    }

    process.stdin.on('data', (chunk) => {
      // If null terminator, reset buffer
      if (chunk[0] == 0) { this.buffer = ''; return }

      // Add data to input buffer
      this.buffer += chunk

      // If current buffer value is valid JSON, clear buffer and run events
      var body;
      try {
        body = JSON.parse(this.buffer)
      } catch (e) { return }
      this.buffer = ''
      this.events.data.forEach((fn) => fn(body))
    })
  }

  /* MetroConnection API */

  on (event, fn) {
    if (Object.keys(this.events).indexOf(event) !== -1) {
      this.events[event].push(fn)
    }
  }

  command (command, fn) {
    this.on('data', (data) => {
      (data.is === command) && fn(data)
    })
  }
}

var cxn = new MetroConnection();
cxn.command('init', (data) => console.log(data))
