#!/usr/bin/env node

var MetroStream = require('./MetroInternal/MetroStream.js')

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
      this.events.data.forEach((post) => post(body))
    })
  }

  /* MetroConnection API */

  on (event) {
    return new MetroStream((post, kill) => {
      if (Object.keys(this.events).indexOf(event) !== -1) {
        this.events[event].push(post)
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
   .transform((data) => {
     return { i: data.i + 1 }
   })
   .do((data) => {
     console.log('second!', data)
   })

//cxn.command('init', (data) => console.log(data))
