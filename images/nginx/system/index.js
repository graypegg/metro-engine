var MetroConnection = require('./MetroInternal/MetroConnection')

var cxn = new MetroConnection();

cxn.command('init')
   .do((data) => {
     console.log('init: ', data)
   })
