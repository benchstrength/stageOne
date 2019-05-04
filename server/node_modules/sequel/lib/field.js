var _ = require('underscore')
var async = require('async')
var BigNumber = require('bignumber.js')

var util = require('./util')

var ValidDataTypes = ['string', 'text', 'integer', 'number', 'float', 'decimal', 'date']

var sequel, Lang, Validation

var Field = function(name, options) {

	options || (options = {})

	if (typeof options == 'string')
		options = {type: options}

	this.name = name
	this.options = options

	sequel = _.last(arguments)
	Lang = sequel.lang
	Validation = sequel.validation

}

_.extend(Field.prototype, {

	castToDataType: function(value) {

		var dataType = this.getDataType()

		if (this.isArray())
		{
			// Arrays are a bit special.

			if (!value)
				// Default to an empty array.
				value = []

			if (!_.isArray(value))
				value = [value]

			for (var i in value)
				value[i] = util.castToDataType(value[i], dataType)

			return value
		}

		return util.castToDataType(value, dataType)

	},

	castToDataTypeForWhereClause: function(value, depth) {

		depth || (depth = 0)

		var dataType = this.getDataType()

		if (
			depth <= 2 &&
			(
				value !== null &&
				typeof value == 'object' &&
				value.toString() == '[object Object]'
			) ||
			_.isArray(value)
		)
		{
			for (var i in value)
				value[i] = this.castToDataTypeForWhereClause(value[i], depth + 1)
		}
		else
		{
			value = this.castToDataType(value)

			if (dataType == 'decimal')
				value = value.toString()
		}

		return value

	},

	validate: function(value, instance, cb) {

		var methods = this.options.validate || {}
		var errors = []

		if (value !== null)
		{
			if (this.isArray())
			{
				if (!_.isArray(value))
					errors.push( Lang.get('field', 'array_expected') )
				else
				{
					failedDataType:
					for (var i in value)
						if (!this.valueMatchesDataType(value[i]))
						{
							errors.push( Lang.get('field', 'array_contains_invalid_data_type') )
							break failedDataType
						}
				}
			}
			else if (!this.valueMatchesDataType(value))
				errors.push( Lang.get('field', 'invalid_data_type') )

		}

		async.each(_.keys(methods), function(name, next) {


			if (typeof methods[name] == 'function')
				return methods[name].call(instance, value, function(error) {

					if (error)
						errors.push(error)

					next()

				})

			if (!Validation.testExists(name))
			{
				errors.push( Lang.get('field', 'validation_test_not_found', name) )
				return next()
			}

			var args = [], msg = ''

			switch (typeof methods[name])
			{
				case 'object':

					if (
						_.isArray(methods[name]) ||
						methods[name] instanceof RegExp
					)
						args = methods[name]
					else
					{
						args = methods[name].args || []
						msg = methods[name].msg || ''
					}

				break

				case 'boolean':
				break

				default:
					args = methods[name]
				break
			}

			if (!Validation.test(name, value, args))
			{
				var error = msg || Validation.getError(name, args)

				errors.push(error)
			}

			next()

		}, function() {

			cb(errors)

		})

	},

	valueMatchesDataType: function(value) {

		switch (this.getDataType())
		{
			case 'string':
			case 'text':
				return typeof value == 'string'

			case 'integer':
				return !isNaN(parseInt(value))

			case 'number':
			case 'float':
			case 'decimal':
				return !isNaN(parseFloat(value))

			case 'date':
				return value instanceof Date && value.toString() != 'Invalid Date'
		}

		return false

	},

	isAutoIncrement: function() {

		return 	this.isPrimaryKey() &&
				typeof this.options.autoIncrement != 'undefined' &&
				this.options.autoIncrement !== false

	},

	isPrimaryKey: function() {

		return 	typeof this.options.primaryKey != 'undefined' &&
				this.options.primaryKey !== false

	},

	isUniqueKey: function() {

		return 	typeof this.options.uniqueKey != 'undefined' &&
				this.options.uniqueKey !== false

	},

	isReadOnly: function() {

		return 	typeof this.options.readOnly != 'undefined' &&
				this.options.readOnly !== false

	},

	getDefaultValue: function() {

		if (!this.hasDefaultValue())
			return null

		var type = this.getType()
		var defaultValue = this.options.defaultValue

		if (this.isArray() && !_.isArray(defaultValue))
			throw new Error( Lang.get('field', 'array_invalid_default_value', this.getName()) )

		switch (type)
		{
			case 'decimal':
				return BigNumber(defaultValue)

			case 'array-decimal':

				for (var i in defaultValue)
					defaultValue[i] = BigNumber(defaultValue[i])

				return defaultValue

			break

			default:
				return defaultValue
		}

	},

	hasDefaultValue: function() {

		return typeof this.options.defaultValue != 'undefined'

	},

	hasValidDataType: function() {

		var dataType = this.getDataType()

		for (var i in ValidDataTypes)
			if (dataType == ValidDataTypes[i])
				return true

		return false

	},

	isArray: function() {

		var type = this.getType()

		return type.substr(0, 'array-'.length) == 'array-'

	},

	getDataType: function() {

		var type = this.getType()

		if (this.isArray())
			return type.substr('array-'.length)

		return type

	},

	getType: function() {

		return this.options.type || null

	},

	getName: function() {

		return this.name

	}

})

module.exports = Field