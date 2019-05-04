var DefaultOptions = {
	locale: 'en',
	langDir: __dirname + '/../lang'
}

var Lang = module.exports = function(options) {

	this.options = options || {}

	this._cache = {}

	this.initialize()

}

Lang.prototype.initialize = function() {

	this.setDefaultOptions()

}

Lang.prototype.setDefaultOptions = function() {

	for (var name in DefaultOptions)
		if (typeof this.options[name] == 'undefined')
			this.options[name] = DefaultOptions[name]

}

Lang.prototype.get = function(group, key) {

	if (this.options.returnLangCodesOnly)
		return this._getCode(group, key)

	var langGroup = this._getGroup(group)
	var langString = !!langGroup[key] ? langGroup[key] : ''

	if (langString.indexOf('%s') != -1)
	{
		var additionalArgs = Array.prototype.slice.call(arguments).slice(2)

		while (additionalArgs.length)
			langString = langString.replace('%s', additionalArgs.shift())
	}

	return langString

}

Lang.prototype._getCode = function(group, key) {

	return (group + '_' + key).toLowerCase()

}

Lang.prototype._getGroup = function(group) {

	if (this._cache[group])
		return this._cache[group]

	var fs = require('fs')
	var filePath = this.options.langDir + '/' + this.options.locale + '/' + group + '.json'
	var contents = fs.readFileSync(filePath, 'utf-8')
	var json = JSON.parse(contents)

	this._cache[group] = json

	return json

}