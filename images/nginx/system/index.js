#!/usr/bin/env node

var MetroEventResolver = require('./MetroInternal/MetroEventResolver.js')

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
      this.events.data.forEach((upd) => upd(body))
    })
  }

  /* MetroConnection API */

  on (event) {
    return new MetroEventResolver((upd, can) => {
      if (Object.keys(this.events).indexOf(event) !== -1) {
        this.events[event].push(upd)
      }
    })
  }

  command (command, fn) {
    this.on('data')
        .do((data) => {
          (data.is === command) && fn(data)
        })
  }
}

var cxn = new MetroConnection();
cxn.on('data')
   .do((data) => {
     console.log(data)
   })
   .do((data) => {
     console.log('second!', data)
   })

//cxn.command('init', (data) => console.log(data))
