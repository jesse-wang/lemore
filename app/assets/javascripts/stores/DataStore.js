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
  // HOME
  homeObjects: [],
  homeFeatures: [],
  homeCategories: [],
  homeRelationships: [],
  firstWeek: 0,

  // PROJECTS
  // Each array caches all projects' respective data indexed by project id
  projectsInfo: {}, // { projectname: { id: xxx, projectname: xxx, ... }, ... }
  projectsUsers: {},  // { projectname: [{user}, ...], ... }
  projectsAlsoLikeIds: {}, // { projectname: [project_id, ...], ... }
  projectsCollectionIds: {}, // { projectname: [collection_id, ...], ... }
  projectsComments: {}, // { projectname: [{comment}, ...] }

  projectsTotal: 0,
  lastSearchCall: 0,
  searching: false,

  projectsViewed: [],
  projectsCooled: [],
  projectsMehed:  [],
  
  // DISCOVER pages
  recommendedProjectIds: [], // [projectname, ...]
  noteworthyProjectIds: [], // [projectname, ...]
  popularProjectIds: [], // [projectname, ...]
  latestProjectIds: [], // [projectname, ...]
  upcomingProjectIds: [], //[projectname, ...]
  discoveredProjectIds: [], // [projectname, ...]

  // COLLECTIONS
  collectionsInfo: {}, // { collectionname: { id: xxx, collectionname: xxx, ... }, ... }
  collectionsProjectIds: {}, // { collectionname: [project_id, ...], ... }

  // USERS
  usersInfo: {},
  userFeeds: { total: 0, activities: [] },

  usersActivities:  {},
  usersSubmissions: {},
  usersUpvotes:     {},
  usersCools:       {},
  usersWants:       {},
  usersOwns:        {},
  usersFollowings:  {},
  usersFollowers:   {},

  // NOTIFICATIONS
  notifications: { total: 0, unread: 0, notifications: [] }
});

var DataStore = _.extend({

  init: function(config) {
    _DataStore = _DataStore.merge(config);
  },

  getStore: function() {
    return _DataStore;
  },

  /*****************************************************/
  //                 Projects
  /*****************************************************/

  requestAllProjects: function(data){
    if (data==undefined) {
      var tags = null;
      var page = 1;
      var tags_change = false;
    } else {
      var tags = data.tags==undefined ? [] : data.tags
      tags = data.tags.length == 0 ? null : data.tags.join(',');
      var page = data.page==undefined ? 1 : data.page
      var tags_change = data.tags_change==undefined? false : data.tags_change
    }
    _DataStore = _DataStore.set('searching', true);

    //Set Timestamp
    var d = new Date();
    var lastSearchCall = d.getTime();

    //Send Request
    AppRequest({
      type: 'get',
      url: rUrl('p'),
      data: { tags: tags, page: page, tags_change: tags_change, lastSearchCall: lastSearchCall}
    }).then(
      function(response) {
        if ((page-1)*Initializers.perPage==_DataStore.get('discoveredProjectIds').length || tags_change) {
          AppActions.receiveAllProjects(response);
        }
      },
      function(error) {
      // TODO: when fail
      }
    );
  },

  receiveAllProjects: function(data){
    //Update last search timestamp
    if (data.lastSearchCall>_DataStore.get('lastSearchCall')) {
      _DataStore = _DataStore.set('lastSearchCall', data.lastSearchCall);
    }
    // Save projects to projectsInfo
    if (data.lastSearchCall>=_DataStore.get('lastSearchCall')) {
      var results = Table.updateProject(_DataStore.get('projectsInfo'), data.projects, _DataStore.get('usersInfo'));
      _DataStore = _DataStore.set('projectsInfo', results.project_table);
      // Save users to usersInfo
      _DataStore = _DataStore.set('usersInfo', results.user_table);
      // Save project ids to discoveredProjectIds

      var discoveredProjectIds = _DataStore.get('discoveredProjectIds');
      if (data.tags_change==='true') {
        discoveredProjectIds = [];
      }
      var ids = discoveredProjectIds.concat(results.ids);
      _DataStore = _DataStore.set('discoveredProjectIds', ids);
      _DataStore = _DataStore.set('projectsTotal', data.total);
    }
    _DataStore = _DataStore.set('searching', false);

    DataStore.emitChange();
  },

  requestHomeSuggestions: function(data){
    AppRequest({
      type: 'get',
      url: rUrl('home_suggestions'),
      data: data
    }).then(
      function(data) {
        AppActions.receiveHomeSuggestions(data);
      },
      function(error) {
        //TODO: when fail
      }
    );
  },

  receiveHomeSuggestions: function(data){
    _DataStore = _DataStore.set('homeObjects', data.objects);
    _DataStore = _DataStore.set('homeFeatures', data.features);
    _DataStore = _DataStore.set('homeCategories', data.categories);
    _DataStore = _DataStore.set('homeRelationships', data.relationships);
    DataStore.emitChange();
  },

  requestNoteworthyProjects: function(data){
    if (data==undefined) {
      var page = 1;
    } else {
      var page = data.page==undefined ? 1 : data.page;
    }

    AppRequest({
      type: 'get',
      url: rUrl('noteworthy'),
      data: {page: page}
    }).then(
      function(response) {
        if ((page-1)*Initializers.perPage==_DataStore.get('noteworthyProjectIds').length) {
          AppActions.receiveNoteworthyProjects(response);
        }
      },
      function(error) {
      // TODO: when fail
      }
    );
  },

  receiveNoteworthyProjects: function(data){
    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), data.projects, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save project ids to noteworthyProjectIds
    var noteworthyProjectIds = _DataStore.get('noteworthyProjectIds');
    var ids = noteworthyProjectIds.concat(results.ids);
    _DataStore = _DataStore.set('noteworthyProjectIds', ids);
    _DataStore = _DataStore.set('projectsTotal', data.total);
    _DataStore = _DataStore.set('firstWeek', data.firstWeek);
    DataStore.emitChange();
  },

  requestPopularProjects: function(data){
    if (data==undefined) {
      var page = 1;
    } else {
      var page = data.page==undefined ? 1 : data.page;
    }

    AppRequest({
      type: 'get',
      url: rUrl('popular'),
      data: {page: page}
    }).then(
      function(response) {
        if ((page-1)*Initializers.perPage==_DataStore.get('popularProjectIds').length) {
          AppActions.receivePopularProjects(response);
        }
      },
      function(error) {
      // TODO: when fail
      }
    );
  },

  receivePopularProjects: function(data){
    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), data.projects, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save project ids to popularProjectIds
    var popularProjectIds = _DataStore.get('popularProjectIds');
    var ids = popularProjectIds.concat(results.ids);
    _DataStore = _DataStore.set('popularProjectIds', ids);
    _DataStore = _DataStore.set('projectsTotal', data.total);
    DataStore.emitChange();
  },

  requestLatestProjects: function(data){
    if (data==undefined) {
      var page = 1;
    } else {
      var page = data.page==undefined ? 1 : data.page;
    }

    AppRequest({
      type: 'get',
      url: rUrl('latest'),
      data: {page: page}
    }).then(
      function(response) {
        if ((page-1)*Initializers.perPage==_DataStore.get('latestProjectIds').length) {
          AppActions.receiveLatestProjects(response);
        }
      },
      function(error) {
      // TODO: when fail
      }
    );
  },

  receiveLatestProjects: function(data){
    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), data.projects, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save project ids to latestProjectIds
    var latestProjectIds = _DataStore.get('latestProjectIds');
    var ids = latestProjectIds.concat(results.ids);
    _DataStore = _DataStore.set('latestProjectIds', ids);
    _DataStore = _DataStore.set('projectsTotal', data.total);
    DataStore.emitChange();
  },

  requestUpcomingProjects: function(data){
    if (data==undefined) {
      var page = 1;
    } else {
      var page = data.page==undefined ? 1 : data.page;
    }

    AppRequest({
      type: 'get',
      url: rUrl('upcoming'),
      data: {page: page}
    }).then(
      function(response) {
        if ((page-1)*Initializers.perPage==_DataStore.get('upcomingProjectIds').length) {
          AppActions.receiveUpcomingProjects(response);
        }
      },
      function(error) {
      // TODO: when fail
      }
    );
  },

  receiveUpcomingProjects: function(data){
    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), data.projects, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save project ids to latestProjectIds
    var upcomingProjectIds = _DataStore.get('upcomingProjectIds');
    var ids = upcomingProjectIds.concat(results.ids);
    _DataStore = _DataStore.set('upcomingProjectIds', ids);
    _DataStore = _DataStore.set('projectsTotal', data.total);
    DataStore.emitChange();
  },

  requestProjectInfo: function(data){
    var projectname = data.projectname;
    AppRequest({
      type: 'get',
      url: rUrl('p/' + projectname),
    }).then(
      function(response){
        //returned value
        AppActions.receiveProjectInfo(response);
      },
      function(error){
        // error
      }
    );
  },

  receiveProjectInfo: function(data){
    console.log(data)
    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), [data], _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);

    DataStore.emitChange();
  },

  requestProjectUsers: function(data){
    var projectname = data.projectname;
    AppRequest({
      type: 'get',
      url: rUrl('p/'+projectname+'/users'),
    }).then(
      function(response){
        //returned value
        AppActions.receiveProjectUsers(response);
      },
      function(error){
        // error
      }
    );
  },

  receiveProjectUsers: function(data){
    // Save users to usersInfo
    var results = Table.updateUser(_DataStore.get('usersInfo'), data.data.ninjas);
    data.data.ninjas = results.ids;
    results = Table.updateUser(results.table, data.data.coolers);
    data.data.coolers = results.ids;
    // results = Table.updateUser(results.table, data.data.upvoters);
    // data.data.upvoters = results.ids;
    // results = Table.updateUser(results.table, data.data.wanters);
    // data.data.wanters = results.ids;
    // results = Table.updateUser(results.table, data.data.owners);
    // data.data.owners = results.ids;
    _DataStore = _DataStore.set('usersInfo', results.table);

    // Save updated data to projectUsers
    results = Table.updateUser(_DataStore.get('projectsUsers'), [data]);
    _DataStore = _DataStore.set('projectsUsers', results.table);
    DataStore.emitChange();
  },

  requestProjectCollections: function(data){
    var projectname = data.projectname;
    AppRequest({
      type: 'get',
      url: rUrl('p/'+projectname+'/collections'),
    }).then(
      function(response){
        //returned value
        AppActions.receiveProjectCollections(response);
      },
      function(error){
        // error
      }
    );
  },

  receiveProjectCollections: function(data){
    // Save collections to collectionsInfo
    var collectionsInfo = _DataStore.get('collectionsInfo');
    results = Table.updateCollection(collectionsInfo, data.data);
    collectionsInfo = results.table;
    _DataStore = _DataStore.set('collectionsInfo', collectionsInfo);

    // Save collection ids to projectsCollectionIds
    var projectsCollectionIds = _DataStore.get('projectsCollectionIds');
    idHash = { id: data.id, ids: results.ids }
    results2 = Table.updateIds(projectsCollectionIds, idHash);
    _DataStore = _DataStore.set('projectsCollectionIds', results2);

    DataStore.emitChange();
  },

  requestProjectAlsoLikes: function(data){
    var pName = data.projectname;
    var uid = data.uid;
    AppRequest({
      type: 'get',
      url: rUrl('p/'+pName+'/u/'+uid+'/recommend?n=24'),
    }).then(
      function(response){
        //returned value
        AppActions.receiveProjectAlsoLikes(response);
      },
      function(error){
        // error
      }
    );
  },

  receiveProjectAlsoLikes: function(data){
    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), data.data, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save project ids to projectsAlsoLikeIds
    var projectsAlsoLikeIds = _DataStore.get('projectsAlsoLikeIds');
    idHash = { id: data.id, ids: results.ids }
    results2 = Table.updateIds(projectsAlsoLikeIds, idHash);
    _DataStore = _DataStore.set('projectsAlsoLikeIds', results2);

    DataStore.emitChange();
  },

  requestProjectComments: function(data){
    var projectsComments = _DataStore.get('projectsComments');
    var pName = data.projectname;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('p/'+pName+'/comments'),
      data: {page: page}
    }).then(
      function(response){
        //returned value
        if (projectsComments.get(pName)==undefined) {
          AppActions.receiveProjectComments(response);
        } else if ((page-1)*Initializers.perPage==_DataStore.get('projectsComments').get(pName).length) {
          AppActions.receiveProjectComments(response);
        }
      },
      function(error){
        // error
      }
    );
  },

  receiveProjectComments: function(data){
    var projectsComments = _DataStore.get('projectsComments');
    if (!!projectsComments.get(data.id) && projectsComments.get(data.id).length>0) {
      var comments = projectsComments.get(data.id).concat(data.data);
      var thisComments = Table.updateHash(projectsComments, [{id: data.id, data:comments}]).table;
    } else {
      var thisComments = Table.updateHash(projectsComments, [data]).table;  
    }
    _DataStore = _DataStore.set('projectsComments', thisComments); 
    DataStore.emitChange();
  },

  projectViewed: function(data){
    _DataStore = _DataStore.set('projectsViewed', _DataStore.get('projectsViewed').concat(data.projectname)); 
    DataStore.emitChange();
  },

  projectCooled: function(data){
    _DataStore = _DataStore.set('projectsCooled', _DataStore.get('projectsCooled').concat(data.projectname));
    project = _DataStore.getIn(['projectsInfo', data.projectname]);
    project.feedback = 'cool';
    _DataStore = _DataStore.setIn(['projectsInfo', data.projectname], project);
    DataStore.emitChange();
  },

  projectMehed: function(data){
    _DataStore = _DataStore.set('projectsMehed', _DataStore.get('projectsMehed').concat(data.projectname));
    project = _DataStore.getIn(['projectsInfo', data.projectname]);
    project.feedback = 'meh';
    _DataStore = _DataStore.setIn(['projectsInfo', data.projectname], project);
    DataStore.emitChange();
  },

  /*****************************************************/
  //                 Collections
  /*****************************************************/

  requestAllCollections: function(data){
    var page = data;
    AppRequest({
      type: 'get',
      url: rUrl('c'),
      data: {page: data}
    }).then(
      function(response){
        //return value
        if (data==undefined) {
          AppActions.receiveAllCollections(response);
        }
        if ((page-1)*Initializers.perPage==_DataStore.get('collectionsInfo').length) {
          AppActions.receiveAllCollections(response);
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveAllCollections: function(data){
    var collectionsInfo = _DataStore.get('collectionsInfo');
    collectionsInfo = Table.updateCollection(collectionsInfo, data).table;
    _DataStore = _DataStore.set('collectionsInfo', collectionsInfo);
    DataStore.emitChange();
  },

  requestCollectionInfo: function(data){
    var cName = data.collectionname;
    AppRequest({
      type: 'get',
      url: rUrl('c/' + cName),
    }).then(
      function(response){
        AppActions.receiveCollectionInfo(response);
      },
      function(error){
        //error
      }
    );
  },

  receiveCollectionInfo: function(data){
    var collectionsInfo = _DataStore.get('collectionsInfo');
    collectionsInfo = Table.updateCollection(collectionsInfo, [data]).table;
    _DataStore = _DataStore.set('collectionsInfo', collectionsInfo);
    DataStore.emitChange();
  },

  requestCollectionProjects: function(data){
    var collectionname = data.collectionname;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('c/' + collectionname + '/projects'),
      data: {page: page}
    }).then(
      function(response){
        var projectIds = _DataStore.getIn(["collectionsProjectIds", collectionname, 'ids']);
        projectIds = projectIds ? projectIds : [];
        if ((page-1)*Initializers.perPage==projectIds.length) {
          AppActions.receiveCollectionProjects({collectionname:collectionname, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveCollectionProjects: function(data){
    var collectionname = data.collectionname;
    var response = data.response;

    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), response.projects, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save project ids to collectionsProjectIds
    var projectIds = _DataStore.getIn(["collectionsProjectIds", collectionname, 'ids']);
    projectIds = projectIds ? projectIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['collectionsProjectIds', collectionname, 'ids'], projectIds);
    _DataStore = _DataStore.setIn(['collectionsProjectIds', collectionname, 'total'], response.total);

    DataStore.emitChange();
  },

  /*****************************************************/
  //                 User login required
  /*****************************************************/

  followUser: function(data){
    var username = data.username;
    AppRequest({
      type: 'post',
      url: rUrl('relationships'),
      data: data
    }).then(
      function(response) {
        AppActions.receiveUserInfo(response);
      },
      function(error) {
        HandleTokenExpired(error);
      }
    );
  },

  unfollowUser: function(data){
    var username = data.username;
    AppRequest({
      type: 'delete',
      url: rUrl('relationships/'+username)
    }).then(
      function(response) {
        AppActions.receiveUserInfo(response);
      },
      function(error) {
        HandleTokenExpired(error);
      }
    );
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

  requestUserFeeds: function(data){
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('feed'),
      data: {page: page}
    }).then(
      function(response){
        if ((page-1)*Initializers.perPage==_DataStore.getIn(['userFeeds', 'activities']).length) {
          AppActions.receiveUserFeeds(response);
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserFeeds: function(data){
    _DataStore = _DataStore.setIn(['userFeeds', 'total'], data.total);
    // Save activitiesInfo to activitiesInfo (activitiesInfo is prepared by backend, no parsing required here)
    _DataStore = _DataStore.setIn(['userFeeds', 'activities'], _DataStore.getIn(['userFeeds', 'activities']).concat(data.activities.activitiesInfo));
    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), data.activities.projectsInfo, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    
    var userResults = Table.updateUser(_DataStore.get('usersInfo'), data.activities.usersInfo);
    _DataStore = _DataStore.set('usersInfo', userResults.table);

    DataStore.emitChange();
  },

  requestUserActivities: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/activities'),
      data: {page: page}
    }).then(
      function(response){
        var activities = _DataStore.getIn(['usersActivities', username, 'activities']);
        activities = activities ? activities : [];
        if ((page-1)*Initializers.perPage==activities.length) {
          AppActions.receiveUserActivities({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserActivities: function(data){
    var username = data.username;
    var response = data.response;

    _DataStore = _DataStore.setIn(['usersActivities', username, 'total'], response.total);
    // Save activitiesInfo to activitiesInfo (activitiesInfo is prepared by backend, no parsing required here)
    var activities = _DataStore.getIn(['usersActivities', username, 'activities']);
    activities = activities ? activities.concat(response.activities.activitiesInfo) : response.activities.activitiesInfo;
    _DataStore = _DataStore.setIn(['usersActivities', username, 'activities'], activities);

    // Save projects to usersInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), response.activities.projectsInfo, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo (extracted from projects)
    _DataStore = _DataStore.set('usersInfo', results.user_table);

    // Save users to usersInfo (standalone)
    var userResults = Table.updateUser(_DataStore.get('usersInfo'), response.activities.usersInfo);
    _DataStore = _DataStore.set('usersInfo', userResults.table);

    DataStore.emitChange();
  },

  requestUserSubmissions: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/submissions'),
      data: {page: page}
    }).then(
      function(response){
        var submissionIds = _DataStore.getIn(['usersSubmissions', username, 'ids']);
        submissionIds = submissionIds ? submissionIds : [];
        if ((page-1)*Initializers.perPage==submissionIds.length) {
          AppActions.receiveUserSubmissions({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserSubmissions: function(data){
    var username = data.username;
    var response = data.response;

    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), response.submissions, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save ids to userSubmission
    var userSubmissionIds = _DataStore.getIn(['usersSubmissions', username, 'ids']);
    userSubmissionIds = userSubmissionIds ? userSubmissionIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['usersSubmissions', username, 'ids'], userSubmissionIds);
    _DataStore = _DataStore.setIn(['usersSubmissions', username, 'total'], response.total);

    DataStore.emitChange();
  },

  requestUserUpvotes: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/upvotes'),
      data: {page: page}
    }).then(
      function(response){
        var upvotes = _DataStore.getIn(['usersUpvotes', username, 'ids']);
        upvotes = upvotes ? upvotes : [];
        if ((page-1)*Initializers.perPage==upvotes.length) {
          AppActions.receiveUserUpvotes({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserUpvotes: function(data){
    var username = data.username;
    var response = data.response;

    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), response.upvotes, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save ids to userUpvote
    var userUpvoteIds = _DataStore.getIn(['usersUpvotes', username, 'ids']);
    userUpvoteIds = userUpvoteIds ? userUpvoteIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['usersUpvotes', username, 'ids'], userUpvoteIds);
    _DataStore = _DataStore.setIn(['usersUpvotes', username, 'total'], response.total);

    DataStore.emitChange();
  },

  requestUserCools: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/cools'),
      data: {page: page}
    }).then(
      function(response){
        var coolIds = _DataStore.getIn(['usersCools', username, 'ids']);
        coolIds = coolIds ? coolIds : [];
        if ((page-1)*Initializers.perPage==coolIds.length) {
          AppActions.receiveUserCools({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserCools: function(data){
    var username = data.username;
    var response = data.response;

    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), response.cools, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save ids to userCools
    var userCoolIds = _DataStore.getIn(['usersCools', username, 'ids']);
    userCoolIds = userCoolIds ? userCoolIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['usersCools', username, 'ids'], userCoolIds);
    _DataStore = _DataStore.setIn(['usersCools', username, 'total'], response.total);

    DataStore.emitChange();
  },

  requestUserWants: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/wants'),
      data: {page: page}
    }).then(
      function(response){
        var wantIds = _DataStore.getIn(['usersWants', username, 'ids']);
        wantIds = wantIds ? wantIds : [];
        if ((page-1)*Initializers.perPage==wantIds.length) {
          AppActions.receiveUserWants({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserWants: function(data){
    var username = data.username;
    var response = data.response;

    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), response.wants, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save ids to userWants
    var userWantIds = _DataStore.getIn(['usersWants', username, 'ids']);
    userWantIds = userWantIds ? userWantIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['usersWants', username, 'ids'], userWantIds);
    _DataStore = _DataStore.setIn(['usersWants', username, 'total'], response.total);

    DataStore.emitChange();
  },

  requestUserOwns: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/owns'),
      data: {page: page}
    }).then(
      function(response){
        var ownIds = _DataStore.getIn(['usersOwns', username, 'ids']);
        ownIds = ownIds ? ownIds : [];
        if ((page-1)*Initializers.perPage==ownIds.length) {
          AppActions.receiveUserOwns({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserOwns: function(data){
    var username = data.username;
    var response = data.response;

    // Save projects to projectsInfo
    var results = Table.updateProject(_DataStore.get('projectsInfo'), response.owns, _DataStore.get('usersInfo'));
    _DataStore = _DataStore.set('projectsInfo', results.project_table);
    // Save users to usersInfo
    _DataStore = _DataStore.set('usersInfo', results.user_table);
    // Save ids to userOwns
    var userOwnIds = _DataStore.getIn(['usersOwns', username, 'ids']);
    userOwnIds = userOwnIds ? userOwnIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['usersOwns', username, 'ids'], userOwnIds);
    _DataStore = _DataStore.setIn(['usersOwns', username, 'total'], response.total);

    DataStore.emitChange();
  },

  requestUserFollowings: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/following'),
      data: {page: page}
    }).then(
      function(response){
        var followingIds = _DataStore.getIn(['usersFollowings', username, 'ids']);
        followingIds = followingIds ? followingIds : [];
        if ((page-1)*Initializers.perPage==followingIds.length) {
          AppActions.receiveUserFollowings({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserFollowings: function(data){
    var username = data.username;
    var response = data.response;

    // Save users to usersInfo
    var results = Table.updateUser(_DataStore.get('usersInfo'), response.followings);
    _DataStore = _DataStore.set('usersInfo', results.table);
    // Save ids to userFollowings
    var userFollowingIds = _DataStore.getIn(['usersFollowings', username, 'ids']);
    userFollowingIds = userFollowingIds ? userFollowingIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['usersFollowings', username, 'ids'], userFollowingIds);
    _DataStore = _DataStore.setIn(['usersFollowings', username, 'total'], response.total);

    DataStore.emitChange();
  },

  requestUserFollowers: function(data){
    var username = data.username;
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+username+'/followers'),
      data: {page: page}
    }).then(
      function(response){
        var followerIds = _DataStore.getIn(['usersFollowers', username, 'ids']);
        followerIds = followerIds ? followerIds : [];
        if ((page-1)*Initializers.perPage==followerIds.length) {
          AppActions.receiveUserFollowers({username:username, response:response});
        }
      },
      function(error){
        //error
      }
    );
  },

  receiveUserFollowers: function(data){
    var username = data.username;
    var response = data.response;

    // Save users to usersInfo
    var results = Table.updateUser(_DataStore.get('usersInfo'), response.followers);
    _DataStore = _DataStore.set('usersInfo', results.table);
    // Save ids to userFollowings
    var userFollowerIds = _DataStore.getIn(['usersFollowers', username, 'ids']);
    userFollowerIds = userFollowerIds ? userFollowerIds.concat(results.ids) : results.ids;
    _DataStore = _DataStore.setIn(['usersFollowers', username, 'ids'], userFollowerIds);
    _DataStore = _DataStore.setIn(['usersFollowers', username, 'total'], response.total);

    DataStore.emitChange();
  },

  requestFeedChange: function(data){
    var uid = data.userId;
    AppRequest({
      type: 'get',
      url: rUrl('u/'+uid+'/feedChange'),
      data: data,
    }).then(
      function(response){
        //return value
        AppActions.receiveFeedChange(response);
      },
      function(error){
        //error
      }
    );
  },

  receiveFeedChange: function(data){
    _DataStore = _DataStore.set('userFeeds', data.activitiesdata);
    var results = Table.updateProject(_DataStore.get('projectsInfo'), data.projectsInfo, _DataStore.get('usersInfo'));
    DataStore.emitChange();
  },

  submitNewProject: function(data){
    var closeModal = data.closeModal;
    delete data.closeModal;
    AppRequest({
      type: 'post',
      url: rUrl('p'),
      data: data
    }).then(
      function(response) {
        window.location.href = "/p/" + response.projectname;
        closeModal();
      },
      function(error) {
      // TODO: when fail
        AppActions.logSubmitNewProjectErrors(JSON.parse(error.responseText));
        HandleTokenExpired(error);
      }
    );
  },

  postComment: function(data){
    AppRequest({
      type: 'post',
      url: rUrl('comments'),
      data: data
    }).then(
      function(response) {
        AppActions.receiveComments(response);
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  upvoteComment: function(data){
    AppRequest({
      type: 'post',
      url: rUrl('comments/'+data.id+'/vote'),
      data: {type: data.type}
    }).then(
      function(response) {
        AppActions.receiveComments(response);
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  receiveComments: function(data){
    var projectsComments = _DataStore.get('projectsComments');
    var thisComments = Table.updateHash(projectsComments, [data]).table;  
    _DataStore = _DataStore.set('projectsComments', thisComments); 
    DataStore.emitChange();
  },

  updateProjectInfo: function(data){
    AppRequest({
      type: "patch",
      url: rUrl('p/' + data.project_id),
      data: data
    }).then(
      function(response){
        AppActions.requestProjectInfo({projectname: response.projectname});
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  projectActivity: function(data){
    AppRequest({
      type: 'post',
      url: rUrl('p/' + data.project_id + '/activity'),
      data: data
    }).then(
      function(response){
        AppActions.receiveProjectInfo(response.info);
        AppActions.receiveProjectUsers(response.users);
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  projectAdminAction: function(data){
    AppRequest({
      type: 'post',
      url: rUrl('p/' + data.project_id + '/admin_action'),
      data: data
    }).then(
      function(response){
        AppActions.receiveProjectInfo(response);
        AppActions.requestProjectCollections({projectname: response.projectname});
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  deleteProjectAttachment: function(data){
    AppRequest({
      type: 'DELETE',
      url: rUrl('p/' + data.project_id + '/showroom/' + data.pa_id),
      data: data
    }).then(
      function(response){
        // TODO: should response OK. 
        AppActions.receiveProjectInfo(response);
      },
      function(error){
        // TODO: add errors here
        HandleTokenExpired(error);
      }
    );
  },

  updateProfile: function(data){
    console.log(data)
    AppRequest({
      type: 'PATCH',
      url: rUrl('u/' + data.username),
      data: data
    }).then(
      function(response){
        console.log(response)
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
  //                 Notifications
  /*****************************************************/  
  requestNotifications: function(data){
    var page = data.page;
    AppRequest({
      type: 'get',
      url: rUrl('notifications'),
      data: {page: page}
    }).then(
      function(response) {
        var notifications = _DataStore.getIn(['notifications', 'notifications']);
        if ((page-1)*Initializers.perPage==notifications.length) {
          AppActions.receiveNotifications(response);
        }
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  receiveNotifications: function(data){
    // Set Users
    var results = Table.updateUser(_DataStore.get('usersInfo'), data.users);
    _DataStore = _DataStore.set('usersInfo', results.table);
    // Set Notifications
    var notifications = _DataStore.getIn(['notifications', 'notifications']);
    _DataStore = _DataStore.setIn(['notifications', 'notifications'], notifications.concat(data.notifications)); 
    // Set Total
    _DataStore = _DataStore.setIn(['notifications', 'total'], data.total); 
    // Set Unread
    var unread = 0;
    _DataStore.getIn(['notifications', 'notifications']).map(function(n) {
      if (n.state == 'unread') { unread++; }
    });
    _DataStore = _DataStore.setIn(['notifications', 'unread'], unread); 

    DataStore.emitChange();
  },

  updateNotification: function(data){
    var id = data.id;
    var index = data.index;
    var state = data.state;
    AppRequest({
      type: 'put',
      url: rUrl('notifications/'+id),
      data: {state: state}
    }).then(
      function(response) {
        AppActions.receiveNotification({index: index, response: response});
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  receiveNotification: function(data){
    var i = data.index;
    var response= data.response;

    _DataStore = _DataStore.setIn(['notifications', 'notifications', parseInt(i)], data.response);

    // Set Unread
    var unread = 0;
    _DataStore.getIn(['notifications', 'notifications']).map(function(n) {
      if (n.state == 'unread') { unread++; }
    });
    _DataStore = _DataStore.setIn(['notifications', 'unread'], unread); 

    DataStore.emitChange();
  },

  markAllNotificationsAsRead: function(data){
    // Set All Read in Store
    _DataStore.getIn(['notifications', 'notifications']).map(function(n, i) {
      if (n.state == 'unread') { 
        n.state = 'read';
      }
    });

    _DataStore = _DataStore.setIn(['notifications', 'unread'], 0); 

    DataStore.emitChange();

    AppRequest({
      type: 'get',
      url: rUrl('notifications/mark_all_read')
    }).then(
      function(response) {
      },
      function(error){
        HandleTokenExpired(error);
      }
    );
  },

  /*****************************************************/
  //                 User login required
  /*****************************************************/
  suggestMaker: function(data){
    AppRequest({
      type: 'POST',
      url: rUrl('suggest_maker'),
      data: data
    }).then(
      function(response){},
      function(error){}
    );
  },

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
    // PROJECTS
    case ActionTypes.REQUEST_ALL_PROJECTS:
      DataStore.requestAllProjects(data);
      break;
    case ActionTypes.RECEIVE_ALL_PROJECTS:
      DataStore.receiveAllProjects(data);
      break;
    case ActionTypes.REQUEST_NOTEWORTHY_PROJECTS:
      DataStore.requestNoteworthyProjects(data);
      break;
    case ActionTypes.RECEIVE_NOTEWORTHY_PROJECTS:
      DataStore.receiveNoteworthyProjects(data);
      break;
    case ActionTypes.REQUEST_POPULAR_PROJECTS:
      DataStore.requestPopularProjects(data);
      break;
    case ActionTypes.RECEIVE_POPULAR_PROJECTS:
      DataStore.receivePopularProjects(data);
      break;
    case ActionTypes.REQUEST_LATEST_PROJECTS:
      DataStore.requestLatestProjects(data);
      break;
    case ActionTypes.RECEIVE_LATEST_PROJECTS:
      DataStore.receiveLatestProjects(data);
      break;    
    case ActionTypes.REQUEST_UPCOMING_PROJECTS:
      DataStore.requestUpcomingProjects(data);
      break;
    case ActionTypes.RECEIVE_UPCOMING_PROJECTS:
      DataStore.receiveUpcomingProjects(data);
      break;
    case ActionTypes.SUBMIT_NEW_PROJECT:
      DataStore.submitNewProject(data);
      break;
    case ActionTypes.REQUEST_PROJECT_INFO:
      DataStore.requestProjectInfo(data);
      break;
    case ActionTypes.RECEIVE_PROJECT_INFO:
      DataStore.receiveProjectInfo(data);
      break;
    case ActionTypes.REQUEST_PROJECT_USERS:
      DataStore.requestProjectUsers(data);
      break;
    case ActionTypes.RECEIVE_PROJECT_USERS:
      DataStore.receiveProjectUsers(data);
      break;
    case ActionTypes.REQUEST_PROJECT_COLLECTIONS:
      DataStore.requestProjectCollections(data);
      break;
    case ActionTypes.RECEIVE_PROJECT_COLLECTIONS:
      DataStore.receiveProjectCollections(data);
      break;
    case ActionTypes.REQUEST_PROJECT_ALSO_LIKES:
      DataStore.requestProjectAlsoLikes(data);
      break;
    case ActionTypes.RECEIVE_PROJECT_ALSO_LIKES:
      DataStore.receiveProjectAlsoLikes(data);
      break;
    case ActionTypes.REQUEST_PROJECT_COMMENTS:
      DataStore.requestProjectComments(data);
      break;
    case ActionTypes.RECEIVE_PROJECT_COMMENTS:
      DataStore.receiveProjectComments(data);
      break;
    case ActionTypes.UPDATE_PROJECT_INFO:
      DataStore.updateProjectInfo(data);
      break;
    case ActionTypes.PROJECT_ACTIVITY:
      DataStore.projectActivity(data);
      break;
    case ActionTypes.PROJECT_ADMIN_ACTION:
      DataStore.projectAdminAction(data);
      break;
    case ActionTypes.DELETE_PROJECT_ATTACHMENT:
      DataStore.deleteProjectAttachment(data);
      break;
    case ActionTypes.REQUEST_HOME_SUGGESTIONS:
      DataStore.requestHomeSuggestions(data);
      break;
    case ActionTypes.RECEIVE_HOME_SUGGESTIONS:
      DataStore.receiveHomeSuggestions(data);
      break;
    case ActionTypes.PROJECT_VIEWED:
      DataStore.projectViewed(data);
      break;
    case ActionTypes.PROJECT_COOLED:
      DataStore.projectCooled(data);
      break;
    case ActionTypes.PROJECT_MEHED:
      DataStore.projectMehed(data);
      break;

    // COMMENTS
    case ActionTypes.POST_COMMENT:
      DataStore.postComment(data);
      break;
    case ActionTypes.RECEIVE_COMMENTS:
      DataStore.receiveComments(data);
      break;
    case ActionTypes.UPVOTE_COMMENT:
      DataStore.upvoteComment(data);
      break;
    
    // COLLECTIONS
    case ActionTypes.REQUEST_ALL_COLLECTIONS:
      DataStore.requestAllCollections(data);
      break;
    case ActionTypes.RECEIVE_ALL_COLLECTIONS:
      DataStore.receiveAllCollections(data);
      break;
    case ActionTypes.REQUEST_COLLECTION_INFO:
      DataStore.requestCollectionInfo(data);
      break;
    case ActionTypes.RECEIVE_COLLECTION_INFO:
      DataStore.receiveCollectionInfo(data);
      break;
    case ActionTypes.REQUEST_COLLECTION_PROJECTS:
      DataStore.requestCollectionProjects(data);
      break;
    case ActionTypes.RECEIVE_COLLECTION_PROJECTS:
      DataStore.receiveCollectionProjects(data);
      break;
    
    // USERS 
    case ActionTypes.REQUEST_USER_INFO:
      DataStore.requestUserInfo(data);
      break;
    case ActionTypes.RECEIVE_USER_INFO:
      DataStore.receiveUserInfo(data);
      break;
    case ActionTypes.REQUEST_USER_FEEDS:
      DataStore.requestUserFeeds(data);
      break;
    case ActionTypes.RECEIVE_USER_FEEDS:
      DataStore.receiveUserFeeds(data);
      break;
    case ActionTypes.REQUEST_FEED_CHANGE:
      DataStore.requestFeedChange(data);
      break;
    case ActionTypes.RECEIVE_FEED_CHANGE:
      DataStore.receiveFeedChange(data);
      break;
    case ActionTypes.REQUEST_USER_ACTIVITIES:
      DataStore.requestUserActivities(data);
      break;
    case ActionTypes.RECEIVE_USER_ACTIVITIES:
      DataStore.receiveUserActivities(data);
      break;
    case ActionTypes.REQUEST_USER_SUBMISSIONS:
      DataStore.requestUserSubmissions(data);
      break;
    case ActionTypes.RECEIVE_USER_SUBMISSIONS:
      DataStore.receiveUserSubmissions(data);
      break;
    case ActionTypes.REQUEST_USER_UPVOTES:
      DataStore.requestUserUpvotes(data);
      break;
    case ActionTypes.RECEIVE_USER_UPVOTES:
      DataStore.receiveUserUpvotes(data);
      break;
    case ActionTypes.REQUEST_USER_COOLS:
      DataStore.requestUserCools(data);
      break;
    case ActionTypes.RECEIVE_USER_COOLS:
      DataStore.receiveUserCools(data);
      break;
    case ActionTypes.REQUEST_USER_WANTS:
      DataStore.requestUserWants(data);
      break;
    case ActionTypes.RECEIVE_USER_WANTS:
      DataStore.receiveUserWants(data);
      break;
    case ActionTypes.REQUEST_USER_OWNS:
      DataStore.requestUserOwns(data);
      break;
    case ActionTypes.RECEIVE_USER_OWNS:
      DataStore.receiveUserOwns(data);
      break;
    case ActionTypes.REQUEST_USER_FOLLOWINGS:
      DataStore.requestUserFollowings(data);
      break;
    case ActionTypes.RECEIVE_USER_FOLLOWINGS:
      DataStore.receiveUserFollowings(data);
      break;
    case ActionTypes.REQUEST_USER_FOLLOWERS:
      DataStore.requestUserFollowers(data);
      break;
    case ActionTypes.RECEIVE_USER_FOLLOWERS:
      DataStore.receiveUserFollowers(data);
      break;
    case ActionTypes.FOLLOW_USER:
      DataStore.followUser(data);
      break;
    case ActionTypes.UNFOLLOW_USER:
      DataStore.unfollowUser(data);
      break;

    // NOTIFICATIONS
    case ActionTypes.REQUEST_NOTIFICATIONS:
      DataStore.requestNotifications(data);
      break;
    case ActionTypes.RECEIVE_NOTIFICATIONS:
      DataStore.receiveNotifications(data);
      break;
    case ActionTypes.UPDATE_NOTIFICATION:
      DataStore.updateNotification(data);
      break;
    case ActionTypes.RECEIVE_NOTIFICATION:
      DataStore.receiveNotification(data);
      break;
    case ActionTypes.MARK_ALL_NOTIFICATIONS_AS_READ:
      DataStore.markAllNotificationsAsRead(data);
      break;

    // OTHERS
    case ActionTypes.SUGGEST_MAKER:
      DataStore.suggestMaker(data);
      break;
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

