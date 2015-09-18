var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var AppActions = {
  /****************************************************/
  //                   Users
  /****************************************************/
  requestAllUsers: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_ALL_USERS,
      data: data
    });
  },

  receiveAllUsers: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_ALL_USERS,
      data: data
    });
  },

  requestUserInfo: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_INFO,
      data: data
    });
  },

  receiveUserInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_INFO,
      data: data
    });
  },

  
  updateProfile: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_PROFILE,
      data: data
    })
  },
  
  /****************************************************/
  //                   Others
  /****************************************************/
  contact: function(name, email, message){
    AppDispatcher.dispatch({
      actionType: ActionTypes.CONTACT,
      name: name,
      email: email,
      message: message
    });
  },

  subscribe: function(email){
    AppDispatcher.dispatch({
      actionType: ActionTypes.SUBSCRIBE,
      email: email
    });
  }
};

module.exports = AppActions;
