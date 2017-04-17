module.exports = {
  entry: 'index.js',
  output: {
    filename:'dist'
  },
  devtool:"sourcemap",
  module:{
    loaders: [
      {test:/\.html$/, loader:'raw'},
      {test:/\.js$/, loader:'js'}
    ]
  }
}