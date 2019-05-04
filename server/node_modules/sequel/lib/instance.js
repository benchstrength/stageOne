var _ = require('underscore')
var async = require('async')
var EventEmitter = require('events').EventEmitter
var BigNumber = require('bignumber.js')
var Promise = require('pseudo-promise')

var sequel, Db, Lang

var Instance = module.exports = function(model, data, options) {

	this.options = options || {}

	this.model = model
	this.data = data
	this.isNewRecord = this.options.isNewRecord === true

	sequel = _.last(arguments)
	Db = sequel.db
	Lang = sequel.lang

	this.initialize()

}

_.extend(Instance.prototype, EventEmitter.prototype, {

	initialize: function() {

		this.prepareData()
		this.cleanUpOptions()

		if (!this.isExistingRecord())
			this.setDefaults()

	},

	set: function(name_or_values, value) {

		switch (typeof name_or_values)
		{
			case 'object':

				var values = name_or_values

				for (var name in values)
					this.set(name, values[name])

			break

			case 'string':

				var name = name_or_values
				var field = this.getField(name)

				if (!!field && field.isReadOnly() && this.isExistingRecord())
					// Don't allow setting of read-only fields for existing records.
					return

				this.data[name] = value

				if (!!field)
					this.castFieldToDataType(name)

			break
		}

	},

	get: function(name) {

		if (typeof name == 'undefined')
			// Return all data.
			return this.data

		return this.getValueFromData(name, this.data)

	},

	getLastSynced: function(name) {

		return this.getValueFromData(name, this.syncedData)

	},

	getBeforeLastSynced: function(name) {

		return this.getValueFromData(name, this.dataBeforeLastSync)

	},

	getChangedData: function() {

		var data = {}

		for (var name in this.getFields())
			if (this.hasChanged(name))
				data[name] = this.get(name)

		return data

	},

	anyHaveChanged: function(fieldsArray) {

		fieldsArray || (fieldsArray = _.keys( this.getFields() ))

		for (var i in fieldsArray)
		{
			var name = fieldsArray[i]

			if (this.hasChanged(name))
				return true
		}

		return false

	},

	hasChanged: function(name) {

		return this.isDifferentBetweenDataSets(name, this.data, this.syncedData)

	},

	anyWereChanged: function(fieldsArray) {

		fieldsArray || (fieldsArray = _.keys( this.getFields() ))

		for (var i in fieldsArray)
		{
			var name = fieldsArray[i]

			if (this.wasChanged(name))
				return true
		}

		return false

	},

	wasChanged: function(name) {

		return this.isDifferentBetweenDataSets(name, this.syncedData, this.dataBeforeLastSync)

	},

	isDifferentBetweenDataSets: function(name, data1, data2) {

		var field = this.getField(name)

		if (!field)
			// Invalid field.
			return false

		var value1 = this.getValueFromData(name, data1)
		var value2 = this.getValueFromData(name, data2)

		// Both are NULL.
		if (value1 === null && value2 === null)
			return false

		// One, but not both, of the values is NULL.
		if (
			(value1 === null && value2 !== null) ||
			(value1 !== null && value2 === null)
		)
			return true

		// If set to increment or decrement, then this field has changed.
		if (this.isIncrementOrDecrement(name))
			return true

		var dataType = field.getDataType()

		if (field.isArray())
		{
			if (value1.length != value2.length)
				return true

			for (var i in value1)
				switch (dataType)
				{
					case 'decimal':
						if (!value1[i].equals(value2[i]))
							return true

					case 'date':
						if (value1.toString() !== value2.toString())
							return true

					default:
						if (value1[i] !== value2[i])
							return true
				}

			return false
		}

		if (dataType == 'decimal')
			return !value1.equals(value2)

		if (dataType == 'date')
			return value1.toString() !== value2.toString()

		return value1 !== value2

	},

	getValueFromData: function(name, data) {

		if (typeof data[name] == 'undefined' || data[name] === null)
			return null

		if (typeof data[name] != 'object')
			return data[name]

		if (_.isDate(data[name]))
			return new Date( data[name].toString() )

		if (_.isArray(data[name]))
		{
			var value = []

			for (var i in data[name])
				value.push( data[name][i] )

			return value
		}

		if (
			typeof data[name].toString == 'function' &&
			data[name].toString() != '[object Object]'
		)
			return data[name]

		// If we got this far, it's a plain ol' object..

		var value = {}

		for (var key in data[name])
			value[key] = data[name][key]

		return value

	},

	syncData: function() {

		this.evaluateIncrementsAndDecrements()

		this.dataBeforeLastSync = this.syncedData || {}
		this.syncedData = {}

		for (var name in this.data)
			this.syncedData[name] = this.get(name)

		if (!this._hasSyncedData)
			this.dataBeforeLastSync = this.syncedData

		this._hasSyncedData = true

	},

	save: function(options) {

		options || (options = {})

		if (options.validate === false)
		{
			// Skip validation.

			if (!this.isExistingRecord())
				return this.create(options)

			return this.update(options)
		}

		var promise = new Promise()

		var self = this

		this.validate().complete(function(errors) {

			if (errors)
				return promise.reject(errors)

			if (!self.isExistingRecord())
				return self.create(options).complete(function(errors, result) {

					if (errors)
						return promise.reject(errors)

					promise.resolve(result)

				})

			self.update(options).complete(function(error, result) {

				if (error)
					return promise.reject(error)

				promise.resolve(result)

			})

		})

		return promise

	},

	// Insert a new record.
	create: function(options) {

		var promise = new Promise()

		if (this.isExistingRecord())
			return promise.reject( Lang.get('instance', 'failed_create_already_exists') )

		options || (options = {})

		var self = this

		this.runHook('beforeCreate').complete(function(error) {

			if (error)
				return promise.reject(error)

			options.table = self.getTableName()

			if (self.model.useTimestamps())
			{
				var now = self.now()

				self.set('created_at', now)
				self.set('updated_at', now)
			}

			var data = {}

			for (var name in self.model.fields)
				data[name] = self.get(name)

			data = self.prepareDataForDb(data)

			Db.create(data, options).complete(function(error, insert_id) {

				if (error)
					return self.runHook('afterFailedCreate').complete(function() {

						promise.reject(error)

					})

				if (self.hasAutoIncrementPrimaryKeyField())
					self.setPrimaryKey(insert_id)

				self.syncData()

				self.isNewRecord = false

				self.runHook('afterCreate').complete(function(error) {

					if (error)
						return promise.reject(error)

					promise.resolve(self)

				})

			})

		})

		return promise

	},

	// Update an existing record.
	update: function(options) {

		var promise = new Promise()

		if (!this.isExistingRecord())
			return promise.reject( Lang.get('instance', 'failed_update_does_not_exist') )

		options || (options = {})

		var self = this

		this.runHook('beforeUpdate').complete(function(error) {

			if (error)
				return promise.reject(error)

			// Nothing to update?
			if (!self.anyHaveChanged())
				// Then just fire the 'afterUpdate' hook, and keep movin'.
				return self.runHook('afterUpdate').complete(function(error) {

					if (error)
						return promise.reject(error)

					promise.resolve(self)

				})

			options.table = self.getTableName()

			options.where = {}
			options.where[self.getPrimaryKeyFieldName()] = self.getPrimaryKey()

			options.limit = 1

			if (self.model.useTimestamps())
			{
				var now = self.now()

				self.set('updated_at', now)
			}

			var data = self.getChangedData()

			data = self.prepareDataForDb(data)

			Db.update(data, options).complete(function(error, num_updated) {

				if (error)
					return self.runHook('afterFailedUpdate').complete(function() {

						promise.reject(error)

					})

				self.syncData()

				self.runHook('afterUpdate').complete(function(error) {

					if (error)
						return promise.reject(error)

					promise.resolve(self)

				})

			})

		})

		return promise

	},

	destroy: function(options) {

		var promise = new Promise()

		if (!this.isExistingRecord())
			return promise.reject( Lang.get('instance', 'failed_destroy_does_not_exist') )

		options || (options = {})

		var self = this

		this.runHook('beforeDestroy').complete(function(error) {

			if (error)
				return promise.reject(error)

			options.table = self.getTableName()

			options.where = {}
			options.where[self.getPrimaryKeyFieldName()] = self.getPrimaryKey()

			options.limit = 1

			Db.destroy(options).complete(function(error) {

				if (error)
					return self.runHook('afterFailedDestroy').complete(function() {

						promise.reject(error)

					})

				self.runHook('afterDestroy').complete(function(error) {

					if (error)
						return promise.reject(error)

					promise.resolve()

				})

			})

		})

		return promise

	},

	validate: function() {

		var promise = new Promise()

		var self = this

		this.runHook('beforeValidate').complete(function(error) {

			if (error)
				return promise.reject(error)

			// This is only temporary.
			self.errors = {}

			async.parallel([

				_.bind(self.validateFields, self),
				_.bind(self.validateInstance, self),
				_.bind(self.validateUniqueKeys, self),
				_.bind(self.validateForeignKeys, self)

			], function() {

				var errors = self.errors

				// Free up memory.
				delete self.errors

				for (var name in errors)
					if (!(errors[name].length > 0))
						delete errors[name]

				for (var name in errors)
					for (var i in errors[name])
						return self.runHook('afterFailedValidate').complete(function() {

							promise.reject(errors)

						})

				self.runHook('afterValidate').complete(function(error) {

					if (error)
						return promise.reject(error)

					promise.resolve()

				})

			})

		})

		return promise

	},

	validateFields: function(cb) {

		var fields = this.getFields()

		var self = this

		async.each(_.keys(fields), function(name, next) {

			var field = fields[name]

			self.errors[name] || (self.errors[name] = [])

			// This is an existing record and this field hasn't changed.
			if (self.isExistingRecord() && !self.hasChanged(name))
				// Skip validation.
				return next()

			var value

			if (self.isIncrementOrDecrement(name))
				value = self.getResultOfIncrementOrDecrement(name)
			else
				value = self.get(name)

			field.validate(value, self, function(errors) {

				if (errors)
					for (var i in errors)
						self.errors[name].push(errors[i])

				if (field.isReadOnly() && self.isExistingRecord() && self.hasChanged(name))
					self.errors[name].push( Lang.get('instance', 'read_only_change_not_allowed', name) )

				next()

			})

		}, cb)

	},

	validateInstance: function(cb) {

		// Are there instance-level validations?
		if (!this.model.options.validate)
			// Nothing to do.
			return cb()

		var methods = this.model.options.validate
		var self = this

		async.each(_.keys(methods), function(name, next) {

			var fn = methods[name]

			self.errors[name] || (self.errors[name] = [])

			switch (typeof fn)
			{
				case 'function':

					fn.call(self, function(error) {

						if (error)
							self.errors[name].push(error)

						next()

					})

				break

				default:

					self.errors[name].push( Lang.get('instance', 'invalid_validation_rule', name) )
					next()

				break
			}

		}, cb)

	},

	validateUniqueKeys: function(cb) {

		var uniqueKeys = this.model.getUniqueKeys()
		var self = this

		async.each(_.keys(uniqueKeys), function(name, next) {

			var uniqueKey = uniqueKeys[name]

			self.errors[name] || (self.errors[name] = [])

			// If this is an existing record, and none of the fields in this key have changed.
			if (self.isExistingRecord() && !self.anyHaveChanged(uniqueKey.fields))
				// Then, skip it.
				return next()

			var options = {}

			options.where = {}

			for (var i in uniqueKey.fields)
			{
				var field_name = uniqueKey.fields[i]
				var value = self.get(field_name)

				// Don't try to search based on NULL values.
				if (value === null)
					continue

				options.where[field_name] = value
			}

			// If no search criteria, then move to the next key.
			if (!(_.keys(options.where).length > 0))
				return next()

			options.attributes = [self.getPrimaryKeyFieldName()]

			self.model.find(options).complete(function(error, result) {

				if (error)
					return next(error)

				if (result)
				{
					var message = uniqueKey.msg || Lang.get('instance', 'unique_key_duplicate_found', uniqueKey.fields.join('\', \''))

					self.errors[name].push(message)
				}

				next()

			})

		}, cb)

	},

	validateForeignKeys: function(cb) {

		var foreignKeys = this.model.options.foreignKeys || {}

		var self = this

		async.each(_.keys(foreignKeys), function(name, next) {

			var foreignKey = foreignKeys[name]

			self.errors[name] || (self.errors[name] = [])

			// If this is an existing record, and the local value hasn't changed.
			if (self.isExistingRecord() && !self.hasChanged(name))
				// Then, skip it.
				return next()

			var foreignModel = sequel.getModel(foreignKey.model)

			if (!foreignModel)
				return next( Lang.get('instance', 'foreign_key_model_not_found') )

			var field = foreignKey.field
			var value = self.get(name)

			var options = {}

			options.where = {}
			options.where[field] = value
			options.attributes = [field]

			foreignModel.find(options).complete(function(error, result) {

				if (error)
					return next(error)

				if (!result)
				{
					var message = foreignKey.msg || Lang.get('instance', 'foreign_key_missing_parent_row')

					self.errors[name].push(message)
				}

				next()

			})

		}, cb)

	},

	isIncrementOrDecrement: function(name) {

		var value = this.get(name)

		return 	value !== null && typeof value == 'object' && !_.isArray(value) &&
				(
					typeof value.increment != 'undefined' ||
					typeof value.decrement != 'undefined'
				)

	},

	getResultOfIncrementOrDecrement: function(name) {

		var field = this.getField(name)
		var number = this.syncedData[name]
		var valueObj = this.get(name)

		if (number === null)
			number = field.getDefaultValue()

		if (isNaN(parseFloat(number)))
			return null

		number = BigNumber(number.toString())

		for (var key in valueObj)
			if (key == 'increment')
				number = number.plus(valueObj[key])
			else if (key == 'decrement')
				number = number.minus(valueObj[key])

		if (field.getType() == 'decimal')
			// For decimal values we return the BigNumber instance.
			return number

		return parseFloat(number)

	},

	evaluateIncrementsAndDecrements: function() {

		var fields = this.getFields()

		for (var name in fields)
			if (this.isIncrementOrDecrement(name))
			{
				var result = this.getResultOfIncrementOrDecrement(name)

				this.set(name, result)
			}

	},

	castDataToTypes: function() {

		for (var name in this.getFields())
			this.castFieldToDataType(name)

	},

	castFieldToDataType: function(name) {

		// Don't cast if this is an increment of decrement.
		if (this.isIncrementOrDecrement(name))
			return

		var value = this.get(name)

		// Only cast non-null values.
		if (value === null)
			return

		var field = this.getField(name)

		value = field.castToDataType(value)

		this.data[name] = value

	},

	fieldHasBeenSet: function(name) {

		var field = this.getField(name)
		var value = this.get(name)

		if (field.isArray())
			return value.length > 0

		return value !== null

	},

	setDefaults: function() {

		var fields = this.getFields()

		for (var name in fields)
		{
			var field = fields[name]

			// Don't set defaults for fields that have already been set.
			if (this.fieldHasBeenSet(name))
				continue

			// Skip fields without a default.
			if (!field.hasDefaultValue())
				continue

			this.set(name, field.getDefaultValue())
		}

	},

	getField: function(name) {

		return this.model.getField(name)

	},

	getFields: function() {

		return this.model.getFields()

	},

	getTableName: function() {

		return this.model.tableName

	},

	setPrimaryKey: function(value) {

		this.set(this.getPrimaryKeyFieldName(), value)

	},

	getPrimaryKey: function() {

		return this.get(this.getPrimaryKeyFieldName())

	},

	getPrimaryKeyFieldName: function() {

		return this.model.getPrimaryKeyFieldName()

	},

	getPrimaryKeyField: function() {

		return this.model.getPrimaryKeyField()

	},

	hasPrimaryKeyField: function() {

		return !!this.getPrimaryKeyField()

	},

	hasAutoIncrementPrimaryKeyField: function() {

		var field = this.getPrimaryKeyField()

		return !!field && field.isAutoIncrement()

	},

	isExistingRecord: function() {

		return this.isNewRecord !== true

	},

	now: function() {

		return this.model.now()

	},

	prepareData: function() {

		var data = {}

		if (this.hasAutoIncrementPrimaryKeyField())
			data[this.getPrimaryKeyFieldName()] = null

		this.data = _.extend(data, this.data)

		this.expandArrays()
		this.castDataToTypes()
		this.syncData()

	},

	cleanUpOptions: function() {

		delete this.options.isNewRecord

	},

	expandArrays: function() {

		var fields = this.getFields()

		for (var name in fields)
		{
			var field = fields[name]

			// Not an array field?
			if (!field.isArray())
				// Skip it.
				continue

			var delimiter = field.options.delimiter || ','
			var value = this.get(name) || ''

			// Already an array.
			if (_.isArray(value))
				// Nothing to do.
				continue

			var array = value.length > 0 ? value.split(delimiter) : []

			this.data[name] = array
		}

	},

	collapseArrays: function(data) {

		var fields = this.getFields()

		for (var name in fields)
		{
			var field = fields[name]

			// Not an array field?
			if (!field.isArray())
				// Skip it.
				continue

			var delimiter = field.options.delimiter || ','
			var value = data[name] || ''

			// Already a string.
			if (!_.isArray(value))
				// Nothing to do.
				continue

			var string = value.join(delimiter)

			data[name] = string
		}

		return data

	},

	prepareDataForDb: function(data) {

		for (var name in data)
		{
			var field = this.getField(name)

			if (data[name] === null)
				continue

			if (!field)
				continue

			var dataType = field.getDataType()

			switch (dataType)
			{
				case 'decimal':

					if (field.isArray())
					{
						for (var i in data[name])
							if (data[name][i] === null)
								data[name][i] = ''
							else
								data[name][i] = data[name][i].toString()

						continue
					}

					if (this.isIncrementOrDecrement(name))
					{
						for (var key in data[name])
							data[name][key] = data[name][key].toString()

						continue
					}

					data[name] = data[name].toString()

				break
			}
		}

		return this.collapseArrays(data)

	},

	runHook: function(type) {

		var promise = new Promise()

		var self = this

		async.eachSeries(this.getHooks(type), function(fn, next) {

			fn.call(self, next)

		}, function(error) {

			if (error)
				return promise.reject(error)

			promise.resolve()

		})

		return promise

	},

	getHooks: function(type) {

		return this.model.getHooks(type)

	}

})