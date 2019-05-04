var _ = require('underscore')
var validator = require('validator')

validator.extend('notEmpty', function(str) {
	return !str.match(/^[\s\t\r\n]*$/)
})

validator.extend('notNull', function(str) {
	return !validator.isNull(str)
})

validator.extend('notIn', function(str, values) {
	return !validator.isIn(str, values)
})

validator.extend('isDecimal', function(str) {
	var result = str.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/)
	return !!str && !!result && !!result[0]
})

validator.extend('isNumber', function(str) {
	return !isNaN(parseFloat(str))
})

validator.extend('min', function(str, value) {
	var number = parseFloat(str)
	return !isNaN(number) && number >= value
})

validator.extend('max', function(str, value) {
	var number = parseFloat(str)
	return !isNaN(number) && number <= value
})

validator.extend('minLen', function(str, min) {
	return !min || str.length >= min
})

validator.extend('maxLen', function(str, max) {
	return !max || str.length <= max
})

validator.extend('precision', function(str, max) {

	var number = parseFloat(str)

	if (isNaN(number))
		// Ignore non-numbers..
		return true

	var precision = Math.max(str.split('').reverse().join('').indexOf('.'), 0)

	return precision <= max
})

var sequel, Lang

var Validation = function(options) {

	this.options = options || {}

	sequel = _.last(arguments)
	Lang = sequel.lang

}

Validation.prototype.getError = function(fn, args) {

	if (typeof args == 'object')
	{
		if (typeof args[0] == 'number')
			args = args.join(', ')
		else if (_.isArray(args))
			args = '\'' + args.join('\', \'') + '\''
	}

	return Lang.get('validation', fn, args)

}

Validation.prototype.test = function(fn, value, args) {

	if (!this.testExists(fn))
		return false

	return validator[fn].apply(undefined, [value].concat([args]))

}

Validation.prototype.testExists = function(fn) {

	return typeof validator[fn] == 'function'

}

module.exports = Validation