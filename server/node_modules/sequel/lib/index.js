var Db = require('./db')
var Lang = require('./lang')
var Model = require('./model')
var Transaction = require('./transaction')
var Validation = require('./validation')

var Sequel = function(options, connection) {

	this.models = {}
	this.options = options || {}
	this.connection = connection || null

	this.initialize()

}

Sequel.prototype.initialize = function() {

	this.lang = new Lang(this.options)
	this.validation = new Validation(this.options, this)
	this.db = new Db(this.options, this.connection)

}

Sequel.prototype.getModel = function(name) {

	return this.models[name] || null

}

Sequel.prototype.getModelByTableName = function(tableName) {

	for (var name in this.models)
		if (
			typeof this.models[name].tableName != 'undefined' &&
			this.models[name].tableName == tableName
		)
			return this.models[name]

	return null

}

Sequel.prototype.define = function(name, fields, options) {

	options || (options = {})

	this.models[name] = new Model(name, fields, options, this)

	return this.models[name]

}

Sequel.prototype.transaction = function(options) {

	return new Transaction(options, this.db, this)

}

Sequel.prototype.clearModels = function() {

	this.models = {}

}

module.exports = Sequel