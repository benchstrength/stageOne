var Promise = require('../index.js')

var _ = require('underscore')
var chai = require('chai')
var expect = chai.expect

describe('Promise', function() {

	it('should be a function', function() {

		expect(Promise).to.be.a('function')

	})

	it('should be an object, once instantiated', function() {

		var promise = new Promise()

		expect(promise).to.be.an('object')

	})

	describe('#complete(fn)', function() {

		it('should be a method', function() {

			var promise = new Promise()

			expect(promise.complete).to.be.a('function')

		})

		it('should add the callback function (\'fn\') as a listener to the \'complete\' event', function() {

			var promise = new Promise()

			promise.complete(someMethod)

			var listeners = promise.listeners('complete')

			expect(listeners).to.have.length(1)
			expect(listeners[0].toString()).to.equal(someMethod.toString())

			function someMethod(error, result) {

			}

		})

		it('should immediately execute the callback function if the promise has already been resolved', function() {

			var promise = new Promise()

			var testResult = {name: 'a result!'}

			promise.resolve(testResult)

			var called = false

			function someMethod(error, result) {

				called = true

				expect(error).to.equal(null)
				expect(result).to.deep.equal(testResult)

			}

			setTimeout(function() {

				promise.complete(someMethod)

			}, 25)

			setTimeout(function() {

				expect(called).to.equal(true)

			}, 50)

		})

		it('should immediately execute the callback function if the promise has already been rejected', function() {

			var promise = new Promise()

			promise.reject(new Error('An error has occurred!'))

			var called = false

			function someMethod(error, result) {

				called = true

				expect(error instanceof Error).to.equal(true)
				expect(result).to.equal(null)

			}

			setTimeout(function() {

				promise.complete(someMethod)

			}, 25)

			setTimeout(function() {

				expect(called).to.equal(true)

			}, 50)

		})

	})

	describe('#done(fn)', function() {

		it('should be a method', function() {

			var promise = new Promise()

			expect(promise.done).to.be.a('function')

		})

		it('should add the callback function (\'fn\') as a listener to the \'complete\' event', function() {

			var promise = new Promise()

			promise.done(someMethod)

			var listeners = promise.listeners('complete')

			expect(listeners).to.have.length(1)
			expect(listeners[0].toString()).to.equal(someMethod.toString())

			function someMethod(error, result) {

			}

		})

		it('should immediately execute the callback function if the promise has already been resolved', function() {

			var promise = new Promise()

			var testResult = {name: 'a result!'}

			promise.resolve(testResult)

			var called = false

			function someMethod(error, result) {

				called = true

				expect(error).to.equal(null)
				expect(result).to.deep.equal(testResult)

			}

			setTimeout(function() {

				promise.done(someMethod)

			}, 25)

			setTimeout(function() {

				expect(called).to.equal(true)

			}, 50)

		})

		it('should immediately execute the callback function if the promise has already been rejected', function() {

			var promise = new Promise()

			promise.reject(new Error('An error has occurred!'))

			var called = false

			function someMethod(error, result) {

				called = true

				expect(error instanceof Error).to.equal(true)
				expect(result).to.equal(null)

			}

			setTimeout(function() {

				promise.done(someMethod)

			}, 25)

			setTimeout(function() {

				expect(called).to.equal(true)

			}, 50)

		})

	})

	describe('#error(fn)', function() {

		it('should be a method', function() {

			var promise = new Promise()

			expect(promise.error).to.be.a('function')

		})

		it('should add the callback function (\'fn\') as a listener to the \'error\' event', function() {

			var promise = new Promise()

			promise.error(someMethod)

			var listeners = promise.listeners('error')

			expect(listeners).to.have.length(1)
			expect(listeners[0].toString()).to.equal(someMethod.toString())

			function someMethod(error) {

			}

		})

		it('should immediately execute the callback function if the promise has already been rejected', function() {

			var promise = new Promise()

			promise.reject(new Error('An error has occurred!'))

			var called = false

			function someMethod(error) {

				called = true

				expect(error instanceof Error).to.equal(true)

			}

			setTimeout(function() {

				promise.error(someMethod)

			}, 25)

			setTimeout(function() {

				expect(called).to.equal(true)

			}, 50)

		})

	})

	describe('#success(fn)', function() {

		it('should be a method', function() {

			var promise = new Promise()

			expect(promise.success).to.be.a('function')

		})

		it('should add the callback function (\'fn\') as a listener to the \'success\' event', function() {

			var promise = new Promise()

			promise.success(someMethod)

			var listeners = promise.listeners('success')

			expect(listeners).to.have.length(1)
			expect(listeners[0].toString()).to.equal(someMethod.toString())

			function someMethod(result) {

			}

		})

		it('should immediately execute the callback function if the promise has already been resolved', function() {

			var promise = new Promise()

			var testResult = {name: 'a result!'}

			promise.resolve(testResult)

			var called = false

			function someMethod(result) {

				called = true

				expect(result).to.deep.equal(testResult)

			}

			setTimeout(function() {

				promise.success(someMethod)

			}, 25)

			setTimeout(function() {

				expect(called).to.equal(true)

			}, 50)

		})

	})

	describe('#reject(error)', function() {

		it('should be a method', function() {

			var promise = new Promise()

			expect(promise.reject).to.be.a('function')

		})

		it('when called, it should execute all the callback functions added to the \'complete\' event with the \'error\' argument', function(done) {

			var promise = new Promise()

			var call_n_times = 5, num_called = 0

			for (var n = 1; n <= call_n_times; n++)
				promise.complete(_.bind(someMethod, undefined, n))

			function someMethod(call_order, error, result) {

				num_called++

				expect(call_order).to.equal(num_called)

				expect(error instanceof Error).to.equal(true)
				expect(result).to.equal(null)

			}

			setTimeout(function() {

				promise.reject(new Error('An error has occurred!'))

			}, 25)

			setTimeout(function() {

				expect(num_called).to.equal(call_n_times)

				done()

			}, 50)

		})

		it('when called, it should execute all the callback functions added to the \'error\' event with the \'error\' argument', function(done) {

			var promise = new Promise()

			var call_n_times = 5, num_called = 0

			for (var n = 1; n <= call_n_times; n++)
				promise.error(_.bind(someMethod, undefined, n))

			function someMethod(call_order, error, result) {

				num_called++

				expect(call_order).to.equal(num_called)

				expect(error instanceof Error).to.equal(true)
				expect(result).to.equal(undefined)

			}

			setTimeout(function() {

				promise.reject(new Error('An error has occurred!'))

			}, 25)

			setTimeout(function() {

				expect(num_called).to.equal(call_n_times)

				done()

			}, 50)

		})
		
	})

	describe('#resolve(result)', function() {

		it('should be a method', function() {

			var promise = new Promise()

			expect(promise.resolve).to.be.a('function')

		})

		it('when called, it should execute all the callback functions added to the \'complete\' event with the \'result\' argument', function(done) {

			var promise = new Promise()

			var testResult = {name: 'A result!'}

			var call_n_times = 5, num_called = 0

			for (var n = 1; n <= call_n_times; n++)
				promise.complete(_.bind(someMethod, undefined, n))

			function someMethod(call_order, error, result) {

				num_called++

				expect(call_order).to.equal(num_called)

				expect(error).to.equal(null)
				expect(result).to.deep.equal(testResult)

			}

			setTimeout(function() {

				promise.resolve(testResult)

			}, 25)

			setTimeout(function() {

				expect(num_called).to.equal(call_n_times)

				done()

			}, 50)

		})

		it('when called, it should execute all the callback functions added to the \'success\' event with the \'result\' argument', function(done) {

			var promise = new Promise()

			var testResult = {name: 'A result!'}

			var call_n_times = 5, num_called = 0

			for (var n = 1; n <= call_n_times; n++)
				promise.success(_.bind(someMethod, undefined, n))

			function someMethod(call_order, result) {

				num_called++

				expect(call_order).to.equal(num_called)

				expect(result).to.deep.equal(testResult)

			}

			setTimeout(function() {

				promise.resolve(testResult)

			}, 25)

			setTimeout(function() {

				expect(num_called).to.equal(call_n_times)

				done()

			}, 50)

		})

	})

	describe('#Chaining', function() {

		it('should be able to chain listener methods', function() {

			var promise = new Promise()

			promise
				.error(errorCallback)
				.success(successCallback)

			var error_listeners = promise.listeners('error')
			var success_listeners = promise.listeners('success')

			expect(error_listeners).to.have.length(1)
			expect(success_listeners).to.have.length(1)
			expect(error_listeners[0].toString()).to.equal(errorCallback.toString())
			expect(success_listeners[0].toString()).to.equal(successCallback.toString())

			function errorCallback(error) {

			}

			function successCallback(result) {

			}

		})

	})

})