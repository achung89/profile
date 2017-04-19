var http = require('http');
var Clay = require('clay-client');


// redirect stdout / stderr
// process.__defineGetter__('stdout', function() { return fs.createWriteStream(__dirname + '/node.log', {flags:'a'}) })
// process.__defineGetter__('stderr', function() { return fs.createWriteStream(__dirname + '/error.log', {flags:'a'}) })

module.exports = {
  getFeed: function getFeed ( req, res ) {
    Clay.run('nicoslepicos/medium-get-users-posts', {"username":"chung.andrew7"})
    .then((result) => {
      res.send(result)
    })
    .catch((error) => {
      res.send(error);
    });
  }
}