var Field = require('./field')
var Instance = require('./instance')
var EventEmitter = require('events').EventEmitter
var util = require('./util')

var _ = require('underscore')
var async = require('async')
var Promise = require('pseudo-promise')

var DateTimeFields = {
	created_at: 'date',
	updated_at: 'date'
}

var DefaultOptions = {
	timestamps: true
}

var ValidHooks = [
	'beforeValidate', 'afterValidate', 'afterFailedValidate',
	'beforeCreate', 'afterCreate', 'afterFailedCreate',
	'beforeUpdate', 'afterUpdate', 'afterFailedUpdate',
	'beforeDestroy', 'afterDestroy', 'afterFailedDestroy'
]

var sequel, Db, Lang

var Model = module.exports = function(name, fields, options) {

	this.options = options || {}

	this.name = name
	this.fields = fields
	this.tableName = this.options.tableName || ''
	this.hooks = this.options.hooks || {}

	sequel = _.last(arguments)
	Db = sequel.db
	Lang = sequel.lang

	this.initialize()

}

_.extend(Model.prototype, EventEmitter.prototype, {

	initialize: function() {

		this.setDefaultOptions()
		this.prepareFields()
		this.prepareHooks()
		this.appendClassMethods()
		this.cleanUpOptions()

	},

	find: function(primary_key, options) {

		if (typeof primary_key == 'object')
		{
			options = primary_key
			primary_key = null
		}

		var promise = new Promise()

		options || (options = {})

		// Find a single instance by its primary key.
		if (primary_key)
		{
			options.where = {}
			options.where[this.getPrimaryKeyFieldName()] = primary_key
		}

		options.limit = 1

		this.findAll(options).complete(function(error, instances) {

			if (error)
				return promise.reject(error)

			if (!instances[0])
				return promise.resolve(null)

			var instance = instances[0]

			promise.resolve(instance)

		})

		return promise

	},

	findAll: function(options) {

		var promise = new Promise()

		options || (options = {})

		options.table = this.getTableName()
		options.select = this.compileSelectFromOptions(options)

		if (!!options.include)
			options.joins = this.compileJoinsFromIncludes(options.include)

		options.order_by || (options.order_by = options.order || '')
		options.group_by || (options.group_by = options.group || '')

		if (!!options.joins && options.joins.length > 0)
			options = this.disambiguateOptions(options)

		if (!!options.where)
			options.where = this.castWhereClauseDataToTypes(options.where)

		var self = this

		Db.find(options).complete(function(error, rows) {

			if (error)
				return promise.reject(error)

			var instances = []

			for (var i in rows)
			{
				var row = rows[i]

				if (!!options.include)
					row = self.castIncludedDataToTypes(row, options.include)

				var instance = self.build(row, {isNewRecord: false})

				instances.push(instance)
			}

			promise.resolve(instances)

		})

		return promise

	},

	create: function(data, options) {

		var promise = new Promise()

		options || (options = {})

		var instance = this.build(data)

		instance.save(options).complete(function(errors, result) {

			if (errors)
				return promise.reject(errors)

			promise.resolve(result)

		})

		return promise

	},

	update: function(data, options) {

		var promise = new Promise()

		options || (options = {})

		options.table = this.getTableName()

		if (!!options.where)
			options.where = this.castWhereClauseDataToTypes(options.where)

		this.findAll(options).complete(function(error, instances) {

			if (error)
				return promise.reject(error)

			async.each(instances, function(instance, next) {

				instance.set(data)

				var saveOptions = {debug: !!options.debug}

				instance.save(saveOptions).complete(next)

			}, function(errors) {

				if (errors)
					return promise.reject(errors)

				promise.resolve()

			})

		})

		return promise

	},

	destroy: function(options) {

		var promise = new Promise()

		options || (options = {})

		options.table = this.getTableName()

		if (!!options.where)
			options.where = this.castWhereClauseDataToTypes(options.where)

		this.findAll(options).complete(function(error, instances) {

			if (error)
				return promise.reject(error)

			async.each(instances, function(instance, next) {

				var destroyOptions = {debug: !!options.debug}

				instance.destroy(destroyOptions).complete(next)

			}, function(errors) {

				if (errors)
					return promise.reject(errors)

				promise.resolve()

			})

		})

		return promise

	},

	count: function(options) {

		var promise = new Promise()

		options || (options = {})

		options.table = this.getTableName()

		if (!!options.where)
			options.where = this.castWhereClauseDataToTypes(options.where)

		var self = this

		Db.count(options).complete(function(error, count) {

			if (error)
				return promise.reject(error)

			promise.resolve(count)

		})

		return promise

	},

	build: function(data, options) {

		options || (options = { isNewRecord: true })

		var instance = new Instance(this, data, options, sequel)

		if (this.options.instanceMethods)
			_.extend(instance, this.options.instanceMethods)

		return instance

	},

	castWhereClauseDataToTypes: function(where) {

		for (var fieldName in where)
		{
			var field

			if (fieldName.indexOf('.') != -1)
			{
				// Might be a field for a different model.

				var parts = fieldName.split('.')
				var tableName = parts[0]
				var model = sequel.getModelByTableName(tableName)

				field = model.getField(parts[1])
			}
			else
			{
				field = this.getField(fieldName)
			}

			if (!field)
				continue

			where[fieldName] = field.castToDataTypeForWhereClause(where[fieldName])
		}

		return where

	},

	castIncludedDataToTypes: function(data, includes) {

		for (var i in includes)
		{
			var include = includes[i]

			if (!include.model)
				// Can only cast to data types if the include specifies a model.
				continue

			var model = sequel.getModel(include.model)

			if (!model)
				continue

			var table = include.table || model.tableName || ''
			var as = include.as || table

			if (!data[as])
				// No data for this model.
				continue

			// When an instance is built, its data is automatically cast to proper data types.
			var instance = model.build(data[as], {isNewRecord: false})

			data[as] = instance.get()
		}

		return data

	},

	disambiguateOptions: function(options) {

		if (!!options.where)
		{
			var where = {}

			for (var field in options.where)
				if (field.indexOf('.') == -1)
					where[options.table + '.' + field] = options.where[field]
				else
					where[field] = options.where[field]

			options.where = where
		}

		if (options.order_by)
		{
			var order_by = options.order_by.split(',')

			for (var i in order_by)
			{
				order_by[i] = util.trim(order_by[i])

				if (order_by[i].indexOf('.') == -1)
					order_by[i] = options.table + '.' + order_by[i]
			}

			options.order_by = order_by.join(', ')
		}

		if (options.group_by)
		{
			var group_by = options.group_by.split(',')

			for (var i in group_by)
			{
				group_by[i] = util.trim(group_by[i])

				if (group_by[i].indexOf('.') == -1)
					group_by[i] = options.table + '.' + group_by[i]
			}

			options.group_by = group_by.join(', ')
		}

		return options

	},

	compileSelectFromOptions: function(options) {

		var select = options.attributes || []

		if (!!options.include && options.include.length > 0)
		{
			if (select.length > 0)
			{
				for (var i in select)
					select[i] = options.table + '.' + select[i]
			}
			else
			{
				// No attributes specified for the main table.

				for (var i in options.include)
				{
					var include = options.include[i]

					// If at least one include has the 'attributes' option.
					if (!!include.attributes && include.attributes.length > 0)
					{
						// Select all of the main table's columns
						select.push( options.table + '.*' )
						break
					}
				}
			}

			for (var i in options.include)
			{
				var include = options.include[i]
				var model = {}

				if (include.model)
				{
					model = sequel.getModel(include.model)

					if (!model)
						continue
				}

				var table = include.table || model.tableName || ''
				var as = include.as || table

				if (!!include.attributes && include.attributes.length > 0)
				{
					for (var n in include.attributes)
						select.push( as + '.' + include.attributes[n] )
				}
				else if (select.length > 0)
				{
					// Select all of the include table's columns.
					select.push( as + '.*' )
				}
			}
		}

		return select

	},

	compileJoinsFromIncludes: function(includes) {

		var joins = []

		for (var i in includes)
		{
			var include = includes[i]

			var join = {}, model = {}

			if (include.model)
			{
				model = sequel.getModel(include.model)

				if (!model)
					continue
			}

			join.table = include.table || model.tableName || ''
			join.on = include.on || []
			join.as = include.as || join.table
			join.type = include.join || ''

			if (include.model && ( !_.isArray(join.on) || !(join.on.length > 0) ))
			{
				var foreignKeys = {}

				// Find foreign keys in this model that reference the included model.
				for (var local in this.options.foreignKeys)
					if (this.options.foreignKeys[local].model == include.model)
					{
						var foreign = this.options.foreignKeys[local].field

						foreignKeys[local] = foreign
					}

				// And the inverse..
				// Find foreign keys in the included model that reference this model.
				for (var foreign in model.options.foreignKeys)
					if (model.options.foreignKeys[foreign].model == this.name)
					{
						var local = model.options.foreignKeys[foreign].field

						foreignKeys[local] = foreign
					}

				if (!_.isEmpty(foreignKeys))
				{
					var local, foreign

					if (typeof join.on == 'string')
					{
						// Use the string from the 'on' clause as the local field.
						// And, then use the local field's matching foreign key field.

						local = join.on
						foreign = foreignKeys[local] || null
					}
					else
					{
						// Use the first foreign key found.

						found_one:
						for (var local in foreignKeys)
						{
							foreign = foreignKeys[local]

							break found_one
						}
					}

					join.on = []

					if (foreign)
						join.on = [
							join.as + '.' + foreign,
							this.tableName + '.' + local
						]
				}
			}

			joins.push(join)
		}

		return joins

	},

	getTableName: function() {

		return this.tableName

	},

	getField: function(name) {

		return typeof this.fields[name] != 'undefined' ? this.fields[name] : null

	},

	getFields: function() {

		return this.fields

	},

	fieldExists: function(name) {

		return !!this.getField(name)

	},

	hasPrimaryKeyField: function() {

		return !!this.getPrimaryKeyField()

	},

	getPrimaryKeyField: function() {

		var name = this.getPrimaryKeyFieldName()

		return !!name && this.getField(name)

	},

	getPrimaryKeyFieldName: function() {

		for (var name in this.fields)
			if (this.fields[name].isPrimaryKey())
				return name

		return null

	},

	getUniqueKeys: function() {

		var uniqueKeys = {}

		// Get individual fields marked as unique keys.
		for (var name in this.fields)
		{
			var field = this.fields[name]

			// Not a unique key?
			if (!field.isUniqueKey())
				// Skip it.
				continue

			var uniqueKey = {}

			uniqueKey.fields = [name]
			uniqueKey.msg = field.options.uniqueKey.msg || ''

			uniqueKeys[name] = uniqueKey
		}

		// Primary key is a unique key, too.
		if (this.hasPrimaryKeyField())
		{
			var field = this.getPrimaryKeyField()
			var name = this.getPrimaryKeyFieldName()

			var uniqueKey = {}

			uniqueKey.fields = [name]
			uniqueKey.msg = field.options.primaryKey.msg || ''

			uniqueKeys[name] = uniqueKey
		}

		if (!!this.options.uniqueKeys)
			for (var i in this.options.uniqueKeys)
			{
				var fields, name, msg

				if (_.isArray(this.options.uniqueKeys[i]))
				{
					fields = this.options.uniqueKeys[i]
					name = fields.join('_').toLowerCase()
					msg = ''
				}
				else
				{
					fields = this.options.uniqueKeys[i].fields
					name = this.options.uniqueKeys[i].name || fields.join('_').toLowerCase()
					msg = this.options.uniqueKeys[i].msg || ''
				}

				var uniqueKey = {}

				uniqueKey.fields = fields
				uniqueKey.msg = msg

				uniqueKeys[name] = uniqueKey
			}

		return uniqueKeys

	},

	useTimestamps: function() {

		return this.options.timestamps === true

	},

	setDefaultOptions: function() {

		for (var name in DefaultOptions)
			if (typeof this.options[name] == 'undefined')
				this.options[name] = DefaultOptions[name]

	},

	prepareFields: function() {

		if (this.useTimestamps())
			_.extend(this.fields, DateTimeFields)

		for (var name in this.fields)
			this.fields[name] = new Field(name, this.fields[name], sequel)

	},

	addField: function(name, options) {

		this.fields[name] = new Field(name, options, sequel)

	},

	prepareHooks: function() {

		for (var name in this.hooks)
			if (_.indexOf(ValidHooks, name) == -1)
				throw new Error( Lang.get('model', 'invalid_hook', name) )

		for (var i in ValidHooks)
		{
			var name = ValidHooks[i]

			this.hooks[name] || (this.hooks[name] = [])
		}

	},

	appendClassMethods: function() {

		if (this.options.classMethods)
			// Add class methods to this model.
			_.extend(this, this.options.classMethods)

	},

	cleanUpOptions: function() {

		delete this.options.tableName

	},

	addHook: function(name, fn) {

		if (typeof this.hooks[name] == 'undefined')
			throw new Error( Lang.get('model', 'invalid_hook', name) )

		this.hooks[name].push(fn)

	},

	getHooks: function(name) {

		return this.hooks[name] || []

	},

	clearHook: function(name) {

		if (typeof this.hooks[name] == 'undefined')
			throw new Error( Lang.get('model', 'invalid_hook', name) )

		this.hooks[name] = []

	},

	clearHooks: function() {

		for (var name in this.hooks)
			this.hooks[name] = []

	},

	now: function() {

		return new Date()

	}

})