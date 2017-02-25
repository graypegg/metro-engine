module.exports = {
  entry: './src/entry.js',
  target: 'node',
  externals: { dockerode: 'require("dockerode")' },
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
