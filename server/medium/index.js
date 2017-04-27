var http = require('http');
var Clay = require('clay-client');
var Feed = require('rss-to-json');


module.exports = {
  getFeed: function getFeed ( req, res ) {

    Feed.load('https://www.medium.com/feed/@chung.andrew7', function(err, rss) {
      if ( err ) res.send ( err )
      res.send ( rss )
    });
  }
}