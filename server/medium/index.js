var http = require('http');
var Clay = require('clay-client');
var Feed = require('rss-to-json');

// redirect stdout / stderr
// process.__defineGetter__('stdout', function() { return fs.createWriteStream(__dirname + '/node.log', {flags:'a'}) })
// process.__defineGetter__('stderr', function() { return fs.createWriteStream(__dirname + '/error.log', {flags:'a'}) })

module.exports = {
  getFeed: function getFeed ( req, res ) {
    // var options = {
    //   host:'medium.com',
    //   port:80,
    //   path: '@chung.andrew7/latest',
    //   headers: {
    //     Accept: 'application/json'
    //   }
    // }
    
    // http.get(options, function(file,err) {
    //   // console.log(file,err);
    //   const { statusCode } = file;
    //   const contentType = file.headers['content-type'];

    //   let error;
    //   if (statusCode !== 200) {
    //     error = new Error(`Request Failed.\n` +
    //                       `Status Code: ${statusCode}`);
    //   } else if (!/^application\/json/.test(contentType)) {
    //     error = new Error(`Invalid content-type.\n` +
    //                       `Expected application/json but received ${contentType}`);
    //   }
    //   file.setEncoding('utf8')
    //   file.on('data',function(data){
    //     console.log('BODY',data);
    //   })
    // })
    // Clay.run('nicoslepicos/medium-get-users-posts', {"username":"chung.andrew7"})
    // .then((result) => {
    //   res.send(result)
    // })
    // .catch((error) => {
    //   res.send(error);
    // });
    Feed.load('https://www.medium.com/feed/@chung.andrew7', function(err, rss) {
      console.log(rss);
      if ( err ) res.send ( err )
      res.send ( rss )
    });
  }
}