# pseudo-promise

A custom promise implementation for Node


## Installation

Add to your application via `npm`:
```
npm install pseudo-promise --save
```
This will install `pseudo-promise` and add it to your application's `package.json` file.


## Usage

Given an asynchronous function:
```
var Promise = require('pseudo-promise')

function asynchronousFunction() {

	var promise = new Promise()

	setTimeout(function() {

		// Uncomment the following line to simulate an error:
		// prommise.reject('An error occurred!')

		promise.resolve({name: 'A result!'})

	}, 500)

	return promise
	
}
```

Listen for either an error or a result:
```
asynchronousFunction().complete(function(error, result) {

	if (error)
		return console.log(error)

	// Do stuff with the result.
	console.log('result:')
	console.log(result)

})
```

Or, listen for the result only:
```
asynchronousFunction().success(function(result) {

	// Do stuff with the result.
	console.log('result:')
	console.log(result)

})
```

Or, listen for the error only:
```
asynchronousFunction().error(function(error) {

	console.log(error)

})
```

Chaining works too:
```
asynchronousFunction()
	.error(function(error) {

		console.log(error)

	})
	.success(function(result) {

		// Do stuff with the result.
		console.log('result:')
		console.log(result)

	})
```


## Contributing

There are a number of ways you can contribute:

* **Improve or correct the documentation** - All the documentation is in this `readme.md` file. If you see a mistake, or think something should be clarified or expanded upon, please [submit a pull request](https://github.com/chill117/pseudo-promise/pulls/new)
* **Report a bug** - Please review [existing issues](https://github.com/chill117/pseudo-promise/issues) before submitting a new one; to avoid duplicates. If you can't find an issue that relates to the bug you've found, please [create a new one](https://github.com/chill117/pseudo-promise/issues).
* **Fix a bug** - Have a look at the [existing issues](https://github.com/chill117/pseudo-promise/issues) for the project. If there's a bug in there that you'd like to tackle, please feel free to do so. I would ask that when fixing a bug, that you first create a failing test that proves the bug. Then to fix the bug, make the test pass. This should hopefully ensure that the bug never creeps into the project again. After you've done all that, you can [submit a pull request](https://github.com/chill117/pseudo-promise/pulls/new) with your changes.

Before you contribute code, please read through at least some of the source code for the project. I would appreciate it if any pull requests for source code changes follow the coding style of the rest of the project.

Now if you're still interested, you'll need to get your local environment configured.


### Configure Local Environment

#### Step 1: Get the Code

First, you'll need to pull down the code from GitHub:
```
git clone git@github.com:chill117/pseudo-promise.git
```

#### Step 2: Install Dependencies

Second, you'll need to install the project dependencies as well as the dev dependencies. To do this, simply run the following from the directory you created in step 1:
```
npm install
```


### Running Tests

With your local environment configured, running tests is as simple as:
```
npm test
```