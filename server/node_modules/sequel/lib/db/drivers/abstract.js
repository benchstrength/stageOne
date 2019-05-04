var _ = require('underscore')
var Promise = require('pseudo-promise')

var Abstract = function() {

}

_.extend(Abstract.prototype, {

	query: function(sql, params, cb) {

		cb('Your database driver is missing the query() method')

	},

	create: function(data, options) {

		var promise = new Promise()

		return promise.reject('Your database driver is missing the create() method')

	},

	find: function(options) {

		var promise = new Promise()

		return promise.reject('Your database driver is missing the find() method')

	},

	update: function(data, options) {

		var promise = new Promise()

		return promise.reject('Your database driver is missing the update() method')

	},

	destroy: function(options) {

		var promise = new Promise()

		return promise.reject('Your database driver is missing the destroy() method')

	},

	count: function(options) {

		var promise = new Promise()

		return promise.reject('Your database driver is missing the count() method')

	},

	escape: function(value) {

		throw new Error('Your database driver is missing the escape() method')

	},

	escapeId: function(identifier) {

		throw new Error('Your database driver is missing the escapeId() method')

	},

	startTransaction: function(cb) {

		cb('Your database driver is missing the startTransaction() method')

	},

	rollbackTransaction: function(cb) {

		cb('Your database driver is missing the rollbackTransaction() method')

	},

	commitTransaction: function(cb) {

		cb('Your database driver is missing the commitTransaction() method')

	}

})

return module.exports = Abstract