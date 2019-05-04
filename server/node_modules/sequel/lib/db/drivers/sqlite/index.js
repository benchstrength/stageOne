var Abstract = require('../abstract')
var QueryBuilder = require('./query-builder')
var Result = require('./result')

var _ = require('underscore')
var Promise = require('pseudo-promise')
var sqlite3 = require('sqlite3')

var SQLiteDriver = function(options, database) {

	this.options = options || (options = {})
	this.database = database || null

	this.initialize()

}

_.extend(SQLiteDriver.prototype, Abstract.prototype, QueryBuilder, Result, {

	initialize: function() {

		if (this.options.debug === true)
			sqlite3.verbose()

		if (!this.database)
		{
			this.database = new sqlite3.Database(this.options.filename)

			this.database.on('error', function(error) {
				console.log('Failed to open SQLite database: ' + error)
			})
		}

	},

	query: function(sql, params, cb) {

		if (typeof params == 'function')
		{
			cb = params
			params = []
		}

		this.database.run(sql, params, cb)

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

			self.query(sql, params, function(error) {

				if (error)
					return promise.reject(error)

				promise.resolve(this.lastID)

			})

			if (options.debug === true)
				console.log(sql)

		})

		return promise

	},

	find: function(options) {

		var promise = new Promise()

		options || (options = {})

		var self = this

		this.buildFindQuery(options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			self.database.all(sql, params, function(error, rows) {

				if (error)
					return promise.reject(error)

				var results = self.buildResultData(options, rows)

				promise.resolve(results)

			})

			if (options.debug === true)
				console.log(sql)

		})

		return promise

	},

	update: function(data, options) {

		var promise = new Promise()

		data || (data = {})
		options || (options = {})
		options.table || (options.table = '')
		options.where || (options.where = {})

		if (_.isEmpty(data))
			return promise.reject('No data provided')

		var self = this

		this.buildUpdateQuery(data, options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			self.query(sql, params, function(error) {

				if (error)
					return promise.reject(error)

				promise.resolve(this.changes)

			})

			if (options.debug === true)
				console.log(sql)

		})

		return promise

	},

	destroy: function(options) {

		var promise = new Promise()

		options || (options = {})
		options.table || (options.table = '')
		options.where || (options.where = {})

		var self = this

		this.buildDestroyQuery(options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			self.query(sql, params, function(error) {

				if (error)
					return promise.reject(error)

				promise.resolve(this.changes)

			})

			if (options.debug === true)
				console.log(sql)

		})

		return promise

	},

	count: function(options) {

		var promise = new Promise()

		options || (options = {})
		options.table || (options.table = '')
		options.where || (options.where = {})
		options.group_by || (options.group_by = '')

		var self = this

		this.buildCountQuery(options, function(error, sql, params) {

			if (error)
				return promise.reject(error)

			self.database.get(sql, params, function(error, row) {

				if (error)
					return promise.reject(error)

				var count = row['COUNT(*)']

				promise.resolve(count)

			})

			if (options.debug === true)
				console.log(sql)

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

		return '`' + identifier.replace(/`/g, '``').replace(/\./g, '`.`') + '`';

	},

	escape: function(value) {

		if (value === undefined || value === null)
			return null

		switch (typeof value)
		{
			case 'boolean':
				return !!value ? 'true' : 'false'

			case 'number':
				return value.toString()
		}

		value = value.toString().replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(str) {

			switch (str)
			{
				case "\0": return "\\0"
				case "\n": return "\\n"
				case "\r": return "\\r"
				case "\b": return "\\b"
				case "\t": return "\\t"
				case "\x1a": return "\\Z"
				default: return "\\" + str
			}

		})

		return "'" + value + "'"

	},

	startTransaction: function(cb) {

		return this.database.run('BEGIN TRANSACTION', [], cb)

	},

	rollbackTransaction: function(cb) {

		return this.database.run('ROLLBACK TRANSACTION', [], cb)

	},

	commitTransaction: function(cb) {

		return this.database.run('COMMIT TRANSACTION', [], cb)

	}

})

module.exports = SQLiteDriver