require('../stylesheets/bootstrap-css/css/bootstrap.min.css');
require('../stylesheets/bootstrap-css/css/bootstrap-social.css');
require('../stylesheets/animations.css');
require('../stylesheets/application.scss');

exports.app = function(appConfig) {
  require('./Router').createRoutes(appConfig);
};