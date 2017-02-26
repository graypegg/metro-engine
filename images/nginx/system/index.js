#!/usr/bin/env node

class MetroConnection {
  constructor () {
    this.staging = ''
    this.events = {
      data: []
    }

    process.stdin.on('data', (chunk) => {
      this.staging += chunk
      var body;
      try {
        body = JSON.parse(this.staging)
      } catch (e) { return }
      this.staging = ''
      this.events.data.forEach((fn) => fn(body))
    })
  }

  /* MetroConnection API */

  on (event, fn) {
    if (Object.keys(this.events).indexOf(event) !== -1) {
      this.events[event].push(fn)
    }
  }
}

var cxn = new MetroConnection();
cxn.on('data', (data) => console.log(data))
cxn.on('data', (data) => console.log(data.hello + 1))
