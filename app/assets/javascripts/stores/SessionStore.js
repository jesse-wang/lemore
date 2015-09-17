var _ = require('underscore');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppRequest = require('../http/AppRequest');
var I = require('immutable');
var Store = require('./Store');
var SessionActions = require('../actions/SessionActions');
var ActionTypes = AppConstants.ActionTypes;
var APIEndpoints = AppConstants.APIEndpoints;
var Cookie = require('react-cookie');

// relative_url
function rUrl(url) {
  return _SessionStore.get('baseUrl') + url;
}

var _SessionStore = I.fromJS({
  // accessToken:   localStorage.getItem('accessToken'),
  error:        null,
  userInfo:     localStorage.getItem('userInfo') // get initially from localStorage, will be set directly upon consecutive requests
});

var SessionStore = _.extend({
  init: function(config) {
    _SessionStore = _SessionStore.merge(config);
  },

  isLoggedIn: function() {
    // var token = _SessionStore.get('accessToken') ? true : false;
    var token = Cookie.load('accessToken') ? true : false; 
    var userInfo = _SessionStore.get('userInfo') ? true : false;
    return (token && userInfo);    
  },

  getAccessToken: function() {
    return Cookie.load('accessToken');
    // return _SessionStore.get('accessToken');
  },

  getUserInfo: function(){
    var userInfo = _SessionStore.get('userInfo');
    if(userInfo == "undefined" || userInfo == null){
      rtv = null;
    } else {
      rtv = JSON.parse(_SessionStore.get('userInfo'));
    }
    return rtv;
  },

  getError: function() {
    return _SessionStore.get('error');
  },

  signup: function(signupInfo){
    AppRequest({
      type: "POST",
      url: rUrl('auth/register'),
      data: signupInfo
    }).then(
      function(data) {
        SessionActions.receiveLogin(data,null);
      },
      function(error) {
        SessionActions.receiveLogin(null,error);
      }
    );
  },

  login: function(signinInfo){
    AppRequest({
      type: "POST",
      url: rUrl('auth/login'),
      data: signinInfo
    }).then(
      function(data) {
        SessionActions.receiveLogin(data,null);
      },
      function(error) {
        SessionActions.receiveLogin(null,error);
      }
    );
  },

  receiveLogin: function(data){

    if (data.json && data.json.access_token) {
      // _SessionStore = _SessionStore.set('accessToken',data.json.access_token);
      _SessionStore = _SessionStore.set('error',null);

      // Token will always live in the session, so that the API can grab it with no hassle
      Cookie.save('accessToken', data.json.access_token, {path: '/'});

      if(data.json.user_info){
        _SessionStore = _SessionStore.set('userInfo',JSON.stringify(data.json.user_info));
        localStorage.setItem('userInfo', JSON.stringify(data.json.user_info));
      }
    }

    if (data.error) {
      _SessionStore = _SessionStore.set('error',data.error);
    }

    SessionStore.emitChange();
  },

  requestCurrentUserInfo: function(){
    AppRequest({
      type:   'GET',
      url:    rUrl('oauth_user_info'),
    }).then(
      function(data){
        SessionActions.receiveCurrentUserInfo(data);
        // TODO: save it somewhere
      },
      function(error){
        // when fail
      }
    );
  },

  receiveCurrentUserInfo: function(data){
    _SessionStore = _SessionStore.set('userInfo',JSON.stringify(data.data));
    localStorage.setItem('userInfo',JSON.stringify(data.data));
    SessionStore.emitChange();
  },

  recoverPassword: function(data){
    var _this = data._this;
    AppRequest({
      type:   'GET',
      url:    rUrl('password_recovery'),
      data:   {email: data.email},
    }).then(
      function(data){
        alert("Please check your email for password reset instructions.");
        _this.transitionTo('home');
      },
      function(error){
        alert('Sorry, that email address is not registered.')
      }
    );
  },

  resetPassword: function(data){
    AppRequest({
      type:   'PUT',
      url:    rUrl('password'),
      data:   data,
    }).then(
      function(data){
        alert('Password reset successful!')
        location.href = _SessionStore.get('baseUrl');
      },
      function(error){
      }
    );
  }
}, Store);

AppDispatcher.register(function(action) {
  switch(action.actionType) {

    case ActionTypes.RECEIVE_LOGIN:
      SessionStore.receiveLogin(action);
      break;

    case ActionTypes.LOGIN_REQUEST:
      SessionStore.login(action.signinInfo);
      break;

    case ActionTypes.LOGOUT:
      // _SessionStore = _SessionStore.set('accessToken',null);
      _SessionStore = _SessionStore.set('userInfo',null);
      // localStorage.removeItem('accessToken');
      Cookie.remove('accessToken', '/');
      localStorage.removeItem('userInfo');
      SessionStore.emitChange();
      break;

    case ActionTypes.SIGNUP_REQUEST:
      SessionStore.signup(action.signupInfo);
      break;

    case ActionTypes.REQUEST_CURRENT_USER_INFO:
      SessionStore.requestCurrentUserInfo();
      break;

    case ActionTypes.RECEIVE_CURRENT_USER_INFO:
      SessionStore.receiveCurrentUserInfo(action.data);
      break;
    case ActionTypes.RECOVER_PASSWORD:
      SessionStore.recoverPassword(action.data);
      break;
    case ActionTypes.RESET_PASSWORD:
      SessionStore.resetPassword(action.data);
      break;

    default:
  }

});

module.exports = SessionStore;