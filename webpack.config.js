module.exports = {
  entry: './src/entry.js',
  externals: { dockerode: 'dockerode' },
  module : {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: './dist/metro.engine.js',
    library: 'MetroEngine',
    libraryTarget: 'commonjs-module'
  }
}
