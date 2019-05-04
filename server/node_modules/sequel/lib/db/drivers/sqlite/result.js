module.exports = {

	buildResultData: function(options, rows) {

		if (!(options.joins.length > 0))
			return rows

		var results = []

		for (var i in rows)
		{
			var row = rows[i], result = {}

			nextField:
			for (var field in row)
			{
				var pos = field.indexOf('__')
				var table = field.substr(0, pos)
				var value = this.autoCastDataType(row[field])
				var realFieldName = field.substr(pos + '__'.length)

				if (table == options.table)
				{
					result[realFieldName] = value
					continue nextField
				}

				for (var i in options.joins)
				{
					var join = options.joins[i]
					var as = join.as || join.table

					if (table == as)
					{
						result[as] || (result[as] = {})
						result[as][realFieldName] = value
						continue nextField
					}
				}
			}

			results.push(result)
		}

		return results

	},

	autoCastDataType: function(data) {

		switch (typeof data)
		{
			case 'string':

				if (data == parseInt(data).toString())
					return parseInt(data)

				if (data == parseFloat(data).toString())
					return parseFloat(data)

				if (data == (new Date(data)).toString())
					return new Date(data)

			break
		}

		return data

	}

}