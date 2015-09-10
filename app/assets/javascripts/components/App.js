var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');
var Cookie = require('react-cookie');
var Icon = require ('react-fa');
// Components
var TopBar = require('./Shared/TopBar');
var Footer = require('./Shared/Footer');

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
      <div style={{background:"whitesmoke"}}>
        <TopBar />
        <RouteHandler appConfig={this.props.appConfig} />
        {/*<Footer />*/}
      </div>
    );
  }
});

module.exports = App;

