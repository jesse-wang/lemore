var _ = require('underscore');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppRequest = require('../http/AppRequest');
var I = require('immutable');
var Store = require('./Store');
var Router = require('../Router.js');
var ActionTypes = AppConstants.ActionTypes;
var APIEndpoints = AppConstants.APIEndpoints;
var AppActions = require('../actions/AppActions');

var _LogStore = I.fromJS({
  submit_new_project_errors: []
});

var LogStore = _.extend({

  getStore: function() {
    return _LogStore;
  },
  
  clearLog: function(name){
    _LogStore = _LogStore.set(name, []);
    LogStore.emitChange();
  },

  logSubmitNewProjectErrors: function(error){
    var tmp = [error.name[0]]
    _LogStore = _LogStore.set('submit_new_project_errors', tmp);
    LogStore.emitChange();
  }

  // add store functions here
}, Store);

// dispatcher registry 
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.LOG_SUBMIT_NEW_PROJECT_ERRORS:
      LogStore.logSubmitNewProjectErrors(action.data);
      break;
  }

});

module.exports = LogStore;