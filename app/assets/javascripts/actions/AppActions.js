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

  createService: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.CREATE_SERVICE,
      data: data
    })
  },
  
  deleteService: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.DELETE_SERVICE,
      data: data
    })
  },

  requestUserComments: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_COMMENTS,
      data: data
    });
  },

  receiveUserComments: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_COMMENTS,
      data: data
    });
  },

  postComment: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.POST_COMMENT,
      data: data
    });
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
