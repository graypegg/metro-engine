var MetroConnection = require('./MetroInternal/MetroConnection')

var exec = require('child_process').exec

var cxn = new MetroConnection();
cxn.command('ping')
   .do((data) => {
     cxn.send('pong', {})
   })

cxn.command('reload')
   .wait((data, res, rej) => {
     exec('nginx -s reload', (err, stdout) => {
       res()
     })
   })
