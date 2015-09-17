var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Uri = require('jsuri');
var Cookie = require('react-cookie');
var Icon = require ('react-fa');
// Stores
var SessionStore = require('../stores/SessionStore');
var DataStore = require('../stores/DataStore');
var LogStore = require('../stores/LogStore');
// Components
var TopBar = require('./Shared/TopBar');
var Footer = require('./Shared/Footer');
var SignInForm = require('./Shared/SignInForm');
var SignUpForm = require('./Shared/SignUpForm');

function getStateFromStores() {
  return {
    isLoggedIn: SessionStore.isLoggedIn(),
    error:      SessionStore.getError(),
    userInfo:   SessionStore.getUserInfo()
  };
}

var App = React.createClass({
  displayName: 'App',

  getInitialState: function() {
    // check if user logged in
    return {
      session: getStateFromStores(),
      dataStore: DataStore.getStore(),
      logStore: LogStore.getStore()
    };
  },

  componentWillMount: function() {
    DataStore.init(this.props.appConfig);
    SessionStore.init(this.props.appConfig);
  },

  componentDidMount: function() {
    SessionStore.addChangeListener(this._onSessionChange);
    DataStore.addChangeListener(this._onDataStoreChange);
    LogStore.addChangeListener(this._onLogStoreChange);
    var oauthResponse = Cookie.load('oauthResponse'); // written by server in oauth case

    if(oauthResponse){
      SessionActions.receiveLogin(oauthResponse);  
      Cookie.remove('oauthResponse', '/');
    }
  },

  componentWillUnmount: function() {
    DataStore.removeChangeListener(this._onDataStoreChange);
    SessionStore.removeChangeListener(this._onSessionChange);
    LogStore.removeChangeListener(this._onLogStoreChange);
  },

  _onSessionChange: function() {
    this.setState({
      session: getStateFromStores()
    });
  },  

  _onDataStoreChange: function() {
    this.setState({
      dataStore: DataStore.getStore()
    });
  },

  _onLogStoreChange: function(){
    this.setState({
      logStore: LogStore.getStore()
    });
  },

  openSignUp: function(){
    this.refs.SignUpForm.openModal();
  },

  openSignIn: function(){
    this.refs.SignInForm.openModal();
  },

  render: function() {
    return (
      <div style={{background:"whitesmoke"}}>
        <TopBar dataStore={this.state.dataStore} session={this.state.session} openSignIn={this.openSignIn} openSignUp={this.openSignUp} />
        <RouteHandler appConfig={this.props.appConfig} dataStore={this.state.dataStore}/>
        <SignInForm session={this.state.session} ref='SignInForm' openSignUp={this.openSignUp} />
        <SignUpForm session={this.state.session} ref='SignUpForm' openSignIn={this.openSignIn} />
        {/*<Footer />*/}
      </div>
    );
  }
});

module.exports = App;

