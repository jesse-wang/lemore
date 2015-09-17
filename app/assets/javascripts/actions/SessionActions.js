var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  signup: function(signupInfo) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SIGNUP_REQUEST,
      signupInfo: signupInfo
    });
  },

  login: function(signinInfo) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGIN_REQUEST,
      signinInfo: signinInfo
    });
  },

  logout: function() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGOUT
    });
  },

  receiveLogin: function(json, error) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_LOGIN,
      json: json,
      error: error
    });
  },

  requestCurrentUserInfo: function(){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_CURRENT_USER_INFO,
    });
  },

  receiveCurrentUserInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_CURRENT_USER_INFO,
      data: data
    });
  },
  
  recoverPassword: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECOVER_PASSWORD,
      data:data
    });
  },
  resetPassword: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RESET_PASSWORD,
      data:data
    })
  }

};