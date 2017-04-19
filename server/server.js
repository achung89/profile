var express = require('express');
var routes = require('./routes/routes.js');
var path = require('path');
var app = express();
var route = express.Router();

app.use('/api', routes(route));
app.use('/files', express.static(path.join(__dirname,'../client/components')))
app.use(express.static(path.join(__dirname,"../")))
app.get('/', function ( req, res ) {
  res.sendFile(path.join(__dirname, "../client/index.html"))
})

app.listen(3000,function(err) {
  if ( err ) {
    console.error('Error loading server:', error);
  } else {
    console.log('Server listening on port 3000');
  }
})
