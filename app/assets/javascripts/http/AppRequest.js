var $ = require('jquery');
var _ = require('underscore');
var AppActions = require('../actions/AppActions');

var AppRequest = function(options) {
  // var accessToken = localStorage.getItem('accessToken');
  var csrfToken = $("meta[name='csrf-token']").attr("content");
  
  var params = {
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-CSRF-Token", csrfToken);
    },
    timeout: 3 * 60 * 1000 // 3分钟
    // headers: {'accessToken': accessToken }
  };

  var startTime = new Date().getTime();

  // if (_.isUndefined(options.type)) {
    // options.type = 'POST';
    // options.data = JSON.stringify(options.data);
  // }

  // if(options.type == "PATCH"){
    // options.data = JSON.stringify(options.data);
  // }

  var request = $.ajax(_.defaults(options, params));

  console.log(options)
  
  request
    .done(function(data) {
      var endTime = new Date().getTime();
      console.log(options.url.split('/')[2], options.url, endTime - startTime);
    })
    .fail(function(jqXHR) {
      console.log('AppRequest failed: ' + jqXHR.statusText, jqXHR.status, false);
    });
    
  return request;
};

module.exports = AppRequest;

