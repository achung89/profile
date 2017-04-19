var path = require('path');
var medium = require('../medium')
module.exports = function ( route ) {
  route.get('/medium', medium.getFeed)
  return route;
}