var keyMirror = require('keymirror');

// dont forget to change this when in production
var APIRoot = 'http://localhost:3000';

module.exports = {

  ActionTypes: keyMirror({

    // Session
    SIGNUP_REQUEST:                 null,
    LOGIN_REQUEST:                  null,
    RECEIVE_LOGIN:                  null,
    LOGOUT:                         null,
    REQUEST_CURRENT_USER_INFO:      null,
    RECEIVE_CURRENT_USER_INFO:      null,
    RECOVER_PASSWORD:               null,
    RESET_PASSWORD:                 null,

    // Users
    REQUEST_ALL_USERS:              null,
    RECEIVE_ALL_USERS:              null,
    REQUEST_USER_INFO:              null,
    RECEIVE_USER_INFO:              null,
    UPDATE_PROFILE:                 null,
    CREATE_SERVICE:                 null,
    DELETE_SERVICE:                 null,
    REQUEST_USER_COMMENTS:          null,
    RECEIVE_USER_COMMENTS:          null,
    POST_COMMENT:                   null,

    // Others
    CONTACT:                        null,
    SUBSCRIBE:                      null
  })
};
