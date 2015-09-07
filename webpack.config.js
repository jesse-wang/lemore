var path = require('path');
/**
 * http://webpack.github.io/docs/configuration.html
 */
module.exports = {
  module: {
    loaders: [
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.scss$/, loader: 'style!css!sass?' +
      'includePaths[]=' +
      path.resolve(__dirname, './bower_components/foundation/scss') +
      '&includePaths[]=' +
      path.resolve(__dirname, './bower_components/breakpoint-sass/stylesheets') +
      '&includePaths[]=' +
      path.resolve(__dirname, './node_modules/susy/sass')
      },
      {test: /\.(woff|woff2|svg|ttf|eot)([\?]?.*)$/, loader: "url-loader?prefix=http://localhost:8080/assets"},
      {test: /\.png/, loader: 'url?limit=10000&mimetype=image/png'},
      {test: /\.svg/, loader: 'url?limit=150000&mimetype=image/svg+xml'},
      {test: /favicon\.png/, loader: 'file?name=favicon.png'},
      //{test: /\.woff$/, loader: 'url?mimetype=application/font-woff'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.js$/, loader: 'jsx-loader?harmony'},
      {test: /\/plupload\/.*\.js$/, loader: 'file'}
    ]
  },
  // 'context' sets the directory where webpack looks for module files you list in your 'require' statements
  context: __dirname + '/app/assets/javascripts',

  entry: {
    app: './main.js'
    //qiniu: './qiniu.js'
  },

  output: {
    path: path.join(__dirname, "/app/assets/javascripts"),
    filename: "[name].js",
    publicPath: "/javascripts/",
    library: 'lemore'
  },

  externals: {
    // If you load jQuery through a CDN this will still work
    // jQuery is now available via "require('jquery')"
    //jquery: 'var jQuery'
  },

  // Turns on source maps
  // Prefix with a '#' to squash the FF warnings that say:
  // 'Using //@ to indicate sourceMappingURL pragmas is deprecated.
  // Use //# instead'
  // devtool: '#eval-source-map',

  // The 'module' and 'loaders' options tell webpack to use loaders.
  // @see http://webpack.github.io/docs/using-loaders.html
  //module: {
    //loaders: [
      //{
        //// @see https://github.com/shama/es6-loader
        //// It was installed with 'npm install es6-loader --save' and transpiles
        //// es6 to es5.
        //loader: 'es6-loader'
      //}
    //]
  //}
  resolve: {
    root: 'app/assets',
    modulesDirectories: ['node_modules', 'bower_components', 'vendor/assets/javascripts'],
    alias: {'react$': 'react/addons'}
  },

  node: {
    global: true,
    console: true,
    process: true
  }
};
