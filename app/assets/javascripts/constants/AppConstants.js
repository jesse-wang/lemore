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

    // Routes
    REDIRECT:                       null,

    // Log & Errors
    LOG_SUBMIT_NEW_PROJECT_ERRORS:  null,
    LOG_UPDATE_PROJECT_ERRORS:      null,
    LOG_NEW_COMMENT_ERRORS:         null,

    // Projects
    REQUEST_ALL_PROJECTS:           null,
    RECEIVE_ALL_PROJECTS:           null,
    REQUEST_NOTEWORTHY_PROJECTS:    null,
    RECEIVE_NOTEWORTHY_PROJECTS:    null,
    REQUEST_POPULAR_PROJECTS:       null,
    RECEIVE_POPULAR_PROJECTS:       null,
    REQUEST_LATEST_PROJECTS:        null,
    RECEIVE_LATEST_PROJECTS:        null,
    REQUEST_UPCOMING_PROJECTS:      null,
    RECEIVE_UPCOMING_PROJECTS:      null,
    
    REQUEST_PROJECT_INFO:           null,
    RECEIVE_PROJECT_INFO:           null,
    REQUEST_PROJECT_USERS:          null,
    RECEIVE_PROJECT_USERS:          null,
    REQUEST_PROJECT_COLLECTIONS:    null,
    RECEIVE_PROJECT_COLLECTIONS:    null,
    REQUEST_PROJECT_ALSO_LIKES:     null,
    RECEIVE_PROJECT_ALSO_LIKES:     null,
    REQUEST_PROJECT_COMMENTS:       null,
    RECEIVE_PROJECT_COMMENTS:       null,

    SUBMIT_NEW_PROJECT:             null,
    SUBMIT_PROJECT_ERROR:           null,
    UPDATE_PROJECT_INFO:            null,
    PROJECT_ACTIVITY:               null,
    PROJECT_ADMIN_ACTION:           null,
    DELETE_PROJECT_ATTACHMENT:      null,

    PROJECT_VIEWED:                 null,
    PROJECT_COOLED:                 null,
    PROJECT_MEHED:                  null,

    // Comments
    POST_COMMENT:                   null,
    RECEIVE_COMMENTS:               null,
    UPVOTE_COMMENT:                 null,

    // Collections
    REQUEST_ALL_COLLECTIONS:        null,
    RECEIVE_ALL_COLLECTIONS:        null,
    REQUEST_COLLECTION_INFO:        null,
    RECEIVE_COLLECTION_INFO:        null,
    REQUEST_COLLECTION_PROJECTS:    null,
    RECEIVE_COLLECTION_PROJECTS:    null,

    // Tags
    // REQUEST_FEATURES:               null,
    // RECEIVE_FEATURES:               null,
    // REQUEST_OBJECTS:                null,
    // RECEIVE_OBJECTS:                null,
    REQUEST_HOME_SUGGESTIONS:       null,
    RECEIVE_HOME_SUGGESTIONS:       null,

    // Users
    REQUEST_USER_INFO:              null,
    RECEIVE_USER_INFO:              null,
    REQUEST_USER_FEEDS:             null,
    RECEIVE_USER_FEEDS:             null,
    REQUEST_USER_ACTIVITIES:        null,
    RECEIVE_USER_ACTIVITIES:        null,
    REQUEST_USER_SUBMISSIONS:       null,
    RECEIVE_USER_SUBMISSIONS:       null,
    REQUEST_USER_UPVOTES:           null,
    RECEIVE_USER_UPVOTES:           null,
    REQUEST_USER_COOLS:             null,
    RECEIVE_USER_COOLS:             null,
    REQUEST_USER_WANTS:             null,
    RECEIVE_USER_WANTS:             null,
    REQUEST_USER_OWNS:              null,
    RECEIVE_USER_OWNS:              null,
    REQUEST_USER_FOLLOWINGS:        null,
    RECEIVE_USER_FOLLOWINGS:        null,
    REQUEST_USER_FOLLOWERS:         null,
    RECEIVE_USER_FOLLOWERS:         null,
    FOLLOW_USER:                    null,
    UNFOLLOW_USER:                  null,
    RECEIVE_USER_INFO:              null,
    UPDATE_PROFILE:                 null,

    // Feeds
    REQUEST_FEED_CHANGE:            null,
    RECEIVE_FEED_CHANGE:            null,
    
    // Notifications
    REQUEST_NOTIFICATIONS:          null,
    RECEIVE_NOTIFICATIONS:          null,
    UPDATE_NOTIFICATION:            null,
    RECEIVE_NOTIFICATION:           null,
    MARK_ALL_NOTIFICATIONS_AS_READ: null,
    
    // Others
    SUGGEST_MAKER:                  null,
    CONTACT:                        null,
    SUBSCRIBE:                      null
  })
};
