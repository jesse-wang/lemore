var React = require('react');
var Router = require('react-router');
// components
var App = require('./components/App');
var Home = require('./components/Home/Home');
var Expert = require('./components/Users/Expert');

var Route = Router.Route,
    NotFoundRoute = Router.NotFoundRoute,
    DefaultRoute = Router.DefaultRoute,
    Redirect = Router.Redirect;

module.exports = {
  createRoutes: function(appConfig) {
    var routes = (
      <Route name='app' path='/' handler={App}>
        <DefaultRoute name="home" handler={Home} />
        <Route name='expert' path='u/:username' handler={Expert} />
      </Route>
    );

    Router.run(routes, Router.HistoryLocation, function(Handler, state) {
      React.render(<Handler appConfig={appConfig} params={state.params}/>, document.body);
    });
  }
};

