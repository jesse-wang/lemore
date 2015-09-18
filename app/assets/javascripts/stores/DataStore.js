var _ = require('underscore');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppRequest = require('../http/AppRequest');
var I = require('immutable');
var Store = require('./Store');
// var URL = require('../util/url');
var ActionTypes = AppConstants.ActionTypes;
// var APIEndpoints = AppConstants.APIEndpoints;
var AppActions = require('../actions/AppActions');
var SessionActions = require('../actions/SessionActions');
var Table = require('../util/table');
// Constants
var Initializers = require('../constants/Initializers');

// relative_url
function rUrl(url) {
  return _DataStore.get('baseUrl') + url;
}

function HandleTokenExpired(error){
  var errMsg = JSON.parse(error.responseText);
  if(error.status == 401 && errMsg.error == "token expired" ){
    SessionActions.logout();
    alert("Session expired, Please log in again");
  }
}

var _DataStore = I.fromJS({
  // USERS
  usersInfo: {},
});

var DataStore = _.extend({

  init: function(config) {
    _DataStore = _DataStore.merge(config);
  },

  getStore: function() {
    return _DataStore;
  },

  /*****************************************************/
  //                 Users
  /*****************************************************/
  requestAllUsers: function(data){
    AppRequest({
      type: 'get',
      url: rUrl('u')
    }).then(
      function(response){
        AppActions.receiveAllUsers(response);
      },
      function(error){
        //error
      }
    );
  },
  
  receiveAllUsers: function(data){
    var usersInfo = _DataStore.get('usersInfo');
    results = Table.updateUser(usersInfo, data);
    usersInfo = results.table;
    _DataStore = _DataStore.set('usersInfo', usersInfo);

    DataStore.emitChange();
  },

  requestUserInfo: function(data){
    AppRequest({
      type: 'get',
      url: rUrl('u/' + data.username)
    }).then(
      function(response){
        AppActions.receiveUserInfo(response);
      },
      function(error){
        //error
      }
    );
  },

  receiveUserInfo: function(data){
    var usersInfo = _DataStore.get('usersInfo');
    results = Table.updateUser(usersInfo, [data]);
    usersInfo = results.table;
    _DataStore = _DataStore.set('usersInfo', usersInfo);

    DataStore.emitChange();
  },

  updateProfile: function(data){
    AppRequest({
      type: 'PATCH',
      url: rUrl('u/' + data.username),
      data: data
    }).then(
      function(response){
        // SessionActions.receiveCurrentUserInfo(response);
        AppActions.receiveUserInfo(response);
      },
      function(error){
        // TODO: add errors here
        HandleTokenExpired(error);
      }
    );
  },

  /*****************************************************/
  //                 Others
  /*****************************************************/
  contact: function(name, email, message){
    AppRequest({
      type: 'POST',
      url: rUrl('contact_email'),
      data: {name: name, email: email, message: message}
    }).then(
      function(response){},
      function(error){}
    );
  },

  subscribe: function(email){
    AppRequest({
      type: 'POST',
      url: rUrl('subscribe'),
      data: {email: email}
    }).then(
      function(response){},
      function(error){}
    );
  }

}, Store);


// dispatcher registry 
AppDispatcher.register(function(action) {
  var data = action.data;
  switch(action.actionType) {
    // USERS 
    case ActionTypes.REQUEST_ALL_USERS:
      DataStore.requestAllUsers(data);
      break;
    case ActionTypes.RECEIVE_ALL_USERS:
      DataStore.receiveAllUsers(data);
      break;
    case ActionTypes.REQUEST_USER_INFO:
      DataStore.requestUserInfo(data);
      break;
    case ActionTypes.RECEIVE_USER_INFO:
      DataStore.receiveUserInfo(data);
      break;
    // OTHERS
    case ActionTypes.CONTACT:
      DataStore.contact(action.name, action.email, action.message);
      break;
    case ActionTypes.SUBSCRIBE:
      DataStore.subscribe(action.email);
      break;
    case ActionTypes.UPDATE_PROFILE:
      DataStore.updateProfile(data);
      break;
  }
});

module.exports = DataStore;

