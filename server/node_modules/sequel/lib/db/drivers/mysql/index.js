var Abstract = require('../abstract')
var QueryBuilder = require('./query-builder')
var Result = require('./result')

var _ = require('underscore')
var mysql = require('mysql')
var Promise = require('pseudo-promise')

var MySQLDriver = function(options, connection) {

	this.options = options || (options = {})
	this.connection = connection || null

	this.initialize()

}

_.extend(MySQLDriver.prototype, Abstract.prototype, QueryBuilder, Result, {

	initialize: function() {

		if (!this.connection)
		{
			this.connection = mysql.createConnection(this.options)
			this.connection.connect()
		}

	},

	query: function(sql, params, cb) {

		if (typeof params == 'function')
		{
			cb = params
			params = []
		}

		return this.connection.query(sql, params, cb)

	},

	create: function(data, options) {

		var promise = new Promise()

		data || (data = {})
		options || (options = {})
		options.table || (options.table = '')

		if (_.isEmpty(data))
			return promise.reject('No data provided')

		var self = this

		this.buildCreateQuery(data, options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			var query = self.query(sql, params, function(error, rows) {

				if (error)
					return promise.reject(error)

				var insert_id = rows.insertId

				promise.resolve(insert_id)

			})

			if (options.debug === true)
				console.log(query.sql)

		})

		return promise

	},

	find: function(options) {

		var promise = new Promise()

		options || (options = {})
		options.debug || (options.debug = this.options.debug)

		var self = this

		this.buildFindQuery(options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			var query = self.query({sql: sql, nestTables: true}, params, function(error, rows, fields) {

				if (error)
					return promise.reject(error)

				var results = self.buildResultData(options, rows, fields)

				promise.resolve(results)

			})

			if (options.debug === true)
				console.log(query.sql)

		})

		return promise

	},

	update: function(data, options) {

		var promise = new Promise()

		data || (data = {})
		options || (options = {})
		options.table || (options.table = '')
		options.where || (options.where = {})
		options.order_by || (options.order_by = '')
		options.limit || (options.limit = null)
		options.debug || (options.debug = this.options.debug)

		if (_.isEmpty(data))
			return promise.reject('No data provided')

		var self = this

		this.buildUpdateQuery(data, options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			var query = self.query(sql, params, function(error, rows) {

				if (error)
					return promise.reject(error)

				var num_updated = rows.affectedRows

				promise.resolve(num_updated)

			})

			if (options.debug === true)
				console.log(query.sql)

		})

		return promise

	},

	destroy: function(options) {

		var promise = new Promise()

		options || (options = {})
		options.table || (options.table = '')
		options.where || (options.where = {})
		options.order_by || (options.order_by = '')
		options.limit || (options.limit = null)
		options.debug || (options.debug = this.options.debug)

		var self = this

		this.buildDestroyQuery(options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			var query = self.query(sql, params, function(error, rows) {

				if (error)
					return promise.reject(error)

				var num_destroyed = rows.affectedRows

				promise.resolve(num_destroyed)

			})

			if (options.debug === true)
				console.log(query.sql)

		})

		return promise

	},

	count: function(options) {

		var promise = new Promise()

		options || (options = {})
		options.table || (options.table = '')
		options.where || (options.where = {})
		options.group_by || (options.group_by = '')
		options.debug || (options.debug = this.options.debug)

		var self = this

		this.buildCountQuery(options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			var query = self.query(sql, params, function(error, rows) {

				if (error)
					return promise.reject(error)

				var count = rows[0]['COUNT(*)']

				promise.resolve(count)

			})

			if (options.debug === true)
				console.log(query.sql)

		})

		return promise

	},

	escapeId: function(identifier) {

		if (identifier.indexOf('.') != -1)
		{
			var parts = identifier.split('.')

			parts[0] = this.escapeId(parts[0])

			if (parts[1] != '*')
				parts[1] = this.escapeId(parts[1])

			return parts[0] + '.' + parts[1]
		}

		return mysql.escapeId(identifier)

	},

	escape: function(value) {

		return this.connection.escape(value)

	},

	startTransaction: function(cb) {

		return this.connection.beginTransaction(cb)

	},

	rollbackTransaction: function(cb) {

		return this.connection.rollback(cb)

	},

	commitTransaction: function(cb) {

		return this.connection.commit(cb)

	}

})

module.exports = MySQLDriver