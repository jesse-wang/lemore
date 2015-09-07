var React = require('react');
var Router = require('react-router');

// Convenience module for rendering the current RouteHandler. Any component that
// needs access to the current RouteHandler can require this module instead of
// having to use createElement directly.
module.exports = function(props, children) {
  return React.createElement(Router.RouteHandler, props, children);
};

