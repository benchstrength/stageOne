module.exports = {

	buildResultData: function(options, rows, fields) {

		var results = []

		for (var i in rows)
		{
			var row = rows[i]

			var result = {}

			for (var n in fields)
				if (fields[n].table == options.table)
					result[fields[n].name] = row[options.table][fields[n].name]

			for (var n in options.joins)
			{
				var join = options.joins[n]
				var as = join.as || join.table

				result[as] = {}

				for (var n in fields)
					if (fields[n].table == as)
						result[as][fields[n].name] = row[as][fields[n].name]
			}

			results.push(result)
		}

		return results

	}
	
}