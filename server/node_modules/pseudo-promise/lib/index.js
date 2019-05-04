var EventEmitter = require('events').EventEmitter

var Promise = function() {

	this.resolved = this.rejected = false
	this.cached_result = this.cached_error = null

}

for (var method in EventEmitter.prototype)
	Promise.prototype[method] = EventEmitter.prototype[method]

Promise.prototype.resolve = function(result) {

	if (this.resolved || this.rejected)
		return this

	this.resolved = true
	this.cached_result = result

	this.emit('success', result)
	this.emit('complete', null, result)

	return this

}

Promise.prototype.reject = function(error) {

	if (this.resolved || this.rejected)
		return this

	this.rejected = true
	this.cached_error = error

	if (this.listeners('error').length > 0)
		this.emit('error', error)

	this.emit('complete', error, null)

	return this

}

Promise.prototype.complete = function(fn) {

	this.on('complete', fn)

	if (this.resolved)
		fn(null, this.cached_result)
	else if (this.rejected)
		fn(this.cached_error, null)

	return this

}

Promise.prototype.error = function(fn) {

	this.on('error', fn)

	if (this.rejected)
		fn(this.cached_error)

	return this

}

Promise.prototype.success = function(fn) {

	this.on('success', fn)

	if (this.resolved)
		fn(this.cached_result)

	return this

}

Promise.prototype.done = Promise.prototype.complete

module.exports = Promise