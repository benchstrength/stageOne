var _ = require('underscore')
var Promise = require('pseudo-promise')

var sequel, Lang

var Transaction = function(options, db) {

	this.options = options || {}

	this.db = db

	sequel = _.last(arguments)
	Lang = sequel.lang

	this.initialize()

}

Transaction.prototype.initialize = function() {

	this.started = this.ended = false

}

Transaction.prototype.start = function() {

	var promise = new Promise()

	if (this.started)
		return promise.reject( Lang.get('transaction', 'already_started') )

	this.started = true

	this.db.startTransaction(function(error) {

		if (error)
			return promise.reject(error)

		promise.resolve()

	})

	return promise

}

Transaction.prototype.rollback = function() {

	var promise = new Promise()

	if (this.ended)
		return promise.reject( Lang.get('transaction', 'already_ended') )

	this.ended = true

	this.db.rollbackTransaction(function(error) {

		if (error)
			return promise.reject(error)

		promise.resolve()

	})

	return promise

}

Transaction.prototype.commit = function() {
	
	var promise = new Promise()

	if (this.ended)
		return promise.reject( Lang.get('transaction', 'already_ended') )

	this.ended = true

	this.db.commitTransaction(function(error) {

		if (error)
			return promise.reject(error)

		promise.resolve()

	})

	return promise

}

module.exports = Transaction