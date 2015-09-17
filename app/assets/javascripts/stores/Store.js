var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var Store = _.extend({
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}, EventEmitter.prototype);

module.exports = Store;
