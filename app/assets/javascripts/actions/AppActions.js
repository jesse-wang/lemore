var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;

var AppActions = {
  /****************************************************/
  //                   Projects
  /****************************************************/
  submitNewProject: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.SUBMIT_NEW_PROJECT,
      data: data
    });
  },

  updateProjectInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_PROJECT_INFO,
      data: data
    });
  },

  projectActivity: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.PROJECT_ACTIVITY,
      data: data
    });
  },

  requestAllProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_ALL_PROJECTS,
      data: data
    });
  },

  receiveAllProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_ALL_PROJECTS,
      data: data
    });
  },

  requestNoteworthyProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_NOTEWORTHY_PROJECTS,
      data: data
    });
  },

  receiveNoteworthyProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_NOTEWORTHY_PROJECTS,
      data: data
    });
  },

  requestPopularProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_POPULAR_PROJECTS,
      data: data
    });
  },

  receivePopularProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_POPULAR_PROJECTS,
      data: data
    });
  },

  requestLatestProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_LATEST_PROJECTS,
      data: data
    });
  },

  receiveLatestProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_LATEST_PROJECTS,
      data: data
    });
  },

  requestUpcomingProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_UPCOMING_PROJECTS,
      data: data
    });
  },

  receiveUpcomingProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_UPCOMING_PROJECTS,
      data: data
    });
  },

  requestDiscoveredProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_DISCOVERED_PROJECTS,
      data: data
    });
  },

  requestProjectInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_PROJECT_INFO,
      data: data
    });
  },

  receiveProjectInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT_INFO,
      data:data
    });
  },

  requestProjectUsers: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_PROJECT_USERS,
      data: data
    });
  },

  receiveProjectUsers: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT_USERS,
      data:data
    });
  },

  requestProjectCollections: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_PROJECT_COLLECTIONS,
      data: data
    });
  },

  receiveProjectCollections: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT_COLLECTIONS,
      data:data
    });
  },

  requestProjectAlsoLikes: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_PROJECT_ALSO_LIKES,
      data: data
    });
  },

  receiveProjectAlsoLikes: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT_ALSO_LIKES,
      data:data
    });
  },

  requestProjectComments: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_PROJECT_COMMENTS,
      data: data
    });
  },

  receiveProjectComments: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_PROJECT_COMMENTS,
      data:data
    });
  },

  // Collections
  requestAllCollections: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_ALL_COLLECTIONS,
      data:data
    });
  },
  receiveAllCollections: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_ALL_COLLECTIONS,
      data:data
    });
  },

  requestCollectionInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_COLLECTION_INFO,
      data:data
    });
  },

  receiveCollectionInfo: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_COLLECTION_INFO,
      data: data
    });
  },

  requestCollectionProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_COLLECTION_PROJECTS,
      data:data
    });
  },

  receiveCollectionProjects: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_COLLECTION_PROJECTS,
      data: data
    });
  },

  projectViewed: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.PROJECT_VIEWED,
      data: data
    });
  },

  projectCooled: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.PROJECT_COOLED,
      data: data
    });
  },

  projectMehed: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.PROJECT_MEHED,
      data: data
    });
  },

  /****************************************************/
  //                Tag Suggestions 
  /****************************************************/

  //Features
  // requestFeatures: function(data){
  //   AppDispatcher.dispatch({
  //     actionType: ActionTypes.REQUEST_FEATURES,
  //     data:data
  //   });
  // },

  // receiveFeatures: function(data){
  //   AppDispatcher.dispatch({
  //     actionType: ActionTypes.RECEIVE_FEATURES,
  //     data:data
  //   });
  // },
  // //Objects
  // requestObjects: function(data){
  //   AppDispatcher.dispatch({
  //     actionType: ActionTypes.REQUEST_OBJECTS,
  //     data:data
  //   });
  // },

  // receiveObjects: function(data){
  //   AppDispatcher.dispatch({
  //     actionType: ActionTypes.RECEIVE_OBJECTS,
  //     data:data
  //   });
  // },
  //Relationships
  requestHomeSuggestions: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_HOME_SUGGESTIONS,
      data:data
    });
  },

  receiveHomeSuggestions: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_HOME_SUGGESTIONS,
      data:data
    });
  },


  /****************************************************/
  //                Errors / Logs
  /****************************************************/

  logSubmitNewProjectErrors: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOG_SUBMIT_NEW_PROJECT_ERRORS,
      data: data
    });
  },

  logUpdateProjectErrors: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOG_UPDATE_PROJECT_ERRORS,
      data: data
    });
  },

  logNewCommentErrors: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOG_NEW_COMMENT_ERRORS,
      data:data
    });
  },

  /****************************************************/
  //                   Comments
  /****************************************************/

  postComment: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.POST_COMMENT,
      data: data
    });
  },

  receiveComments: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_COMMENTS,
      data:data
    });
  },
  
  upvoteComment: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPVOTE_COMMENT,
      data: data
    });
  },

  /****************************************************/
  //                   Users
  /****************************************************/
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
  
  requestUserFeeds: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_FEEDS,
      data: data
    });
  },

  receiveUserFeeds: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_FEEDS,
      data: data
    });
  },

  requestUserActivities: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_ACTIVITIES,
      data: data
    });
  },

  receiveUserActivities: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_ACTIVITIES,
      data: data
    });
  },

  requestUserSubmissions: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_SUBMISSIONS,
      data: data
    });
  },

  receiveUserSubmissions: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_SUBMISSIONS,
      data: data
    });
  },

  requestUserUpvotes: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_UPVOTES,
      data: data
    });
  },

  receiveUserUpvotes: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_UPVOTES,
      data: data
    });
  },

  requestUserCools: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_COOLS,
      data: data
    });
  },

  receiveUserCools: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_COOLS,
      data: data
    });
  },

  requestUserWants: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_WANTS,
      data: data
    });
  },

  receiveUserWants: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_WANTS,
      data: data
    });
  },

  requestUserOwns: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_OWNS,
      data: data
    });
  },

  receiveUserOwns: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_OWNS,
      data: data
    });
  },

  requestUserFollowings: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_FOLLOWINGS,
      data: data
    });
  },

  receiveUserFollowings: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_FOLLOWINGS,
      data: data
    });
  },

  requestUserFollowers: function(data){    
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_USER_FOLLOWERS,
      data: data
    });
  },

  receiveUserFollowers: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_USER_FOLLOWERS,
      data: data
    });
  },

  projectAdminAction: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.PROJECT_ADMIN_ACTION,
      data: data
    });
  },

  requestFeedChange: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_FEED_CHANGE,
      data: data
    });
  },

  receiveFeedChange: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_FEED_CHANGE,
      data: data
    });
  },

  deleteProjectAttachment: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.DELETE_PROJECT_ATTACHMENT,
      data: data
    });
  },

  followUser: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.FOLLOW_USER,
      data: data
    });
  },

  unfollowUser: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.UNFOLLOW_USER,
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
  //                   Notifications
  /****************************************************/
  requestNotifications: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.REQUEST_NOTIFICATIONS,
      data: data
    });
  },

  receiveNotifications: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_NOTIFICATIONS,
      data: data
    });
  },

  updateNotification: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_NOTIFICATION,
      data: data
    });
  },

  receiveNotification: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_NOTIFICATION,
      data: data
    });
  },

  markAllNotificationsAsRead: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.MARK_ALL_NOTIFICATIONS_AS_READ,
      data: data
    });
  },

  /****************************************************/
  //                   Others
  /****************************************************/
  suggestMaker: function(data){
    AppDispatcher.dispatch({
      actionType: ActionTypes.SUGGEST_MAKER,
      data: data
    });
  },

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
