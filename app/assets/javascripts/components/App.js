var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');
var Cookie = require('react-cookie');

var App = React.createClass({
  displayName: 'App',

  // getInitialState: function() {
    // check if user logged in
    // return {
    //   session: getStateFromStores(),
    //   pnStore: PnStore.getStore()
    // };
  // },

  render: function() {
    return (
      <div>
      Hello World!
      </div>
    );
  }
});

module.exports = App;

