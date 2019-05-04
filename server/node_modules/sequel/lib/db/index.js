var _ = require('underscore')
var fs = require('fs')

var Db = function(options, connection) {

	options || (options = {})

	if (!options.driver)
	{
		console.log('Fatal Error: Database driver not specified')

		return false
	}

	if (!driverExists(options.driver))
	{
		console.log('Fatal Error: Invalid database driver')

		return false
	}

	return loadDriver(options.driver, options, connection)

}

function loadDriver(driver, options, connection) {

	var Driver = require(__dirname + '/drivers/' + driver)

	return new Driver(options, connection)

}

function driverExists(driver) {

	return fs.existsSync(__dirname + '/drivers/' + driver)

}

module.exports = Db