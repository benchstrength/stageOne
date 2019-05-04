# Sequel

[![Build Status](https://travis-ci.org/chill117/sequel.svg?branch=master)](https://travis-ci.org/chill117/sequel)

A Database Modeler for Node; designed to help you produce easy-to-read, maintainable code.

The goal of this project is not to be everything to everyone. It is not meant to solve every possible edge case. Instead, it is focused on the most common use cases for data-driven applications. That being said, take a gander at the [Documentation](https://github.com/chill117/sequel/wiki/Documentation) to see if sequel will fit your application's needs.

Sequel currently works with the following databases:

* [MySQL](https://www.mysql.com/)
* [SQLite](https://www.sqlite.org/docs.html)


## Installation

Add to your application via `npm`:
```
npm install sequel --save
```
This will install `sequel` and add it to your application's `package.json` file.

Sequel does not have a database driver as a dependency, so you must install one separately from sequel.

If you are using MySQL, and have not already installed the `mysql` package, you can install it with the following:
```
npm install mysql --save
```

If you are using SQLite, and have not already installed the `sqlite3` package, you can install it with the following:
```
npm install sqlite3 --save
```


## Contributing

There are a number of ways you can contribute:

* **Improve or correct the documentation** - All the documentation is in this `readme.md` file. If you see a mistake, or think something should be clarified or expanded upon, please [submit a pull request](https://github.com/chill117/sequel/pulls/new)
* **Report a bug** - Please review [existing issues](https://github.com/chill117/sequel/issues) before submitting a new one; to avoid duplicates. If you can't find an issue that relates to the bug you've found, please [create a new one](https://github.com/chill117/sequel/issues).
* **Request a feature** - Again, please review the [existing issues](https://github.com/chill117/sequel/issues) before posting a feature request. If you can't find an existing one that covers your feature idea, please [create a new one](https://github.com/chill117/sequel/issues).
* **Fix a bug** - Have a look at the [existing issues](https://github.com/chill117/sequel/issues) for the project. If there's a bug in there that you'd like to tackle, please feel free to do so. I would ask that when fixing a bug, that you first create a failing test that proves the bug. Then to fix the bug, make the test pass. This should hopefully ensure that the bug never creeps into the project again. After you've done all that, you can [submit a pull request](https://github.com/chill117/sequel/pulls/new) with your changes.

Before you contribute code, please read through at least some of the source code for the project. I would appreciate it if any pull requests for source code changes follow the coding style of the rest of the project.

Now if you're still interested, you'll need to get your local environment configured.

### Configure Local Environment

#### Step 1: Get the Code

First, you'll need to pull down the code from GitHub:
```
git clone git@github.com:chill117/sequel.git
```

#### Step 2: Install Dependencies

Second, you'll need to install the project dependencies as well as the dev dependencies. To do this, simply run the following from the directory you created in step 1:
```
npm install
```

#### Step 3: Set Up Databases

Now, you'll need to set up local test databases for each database driver:
```js
{
	mysql: {
		host: 'localhost',
		port: 3306,
		user: 'sequel_test',
		password: 'password',
		database: 'sequel_test',
		driver: 'mysql'
	},
	sqlite: {
		filename: ':memory:',
		driver: 'sqlite'
	}
}
```
*These database credentials are located at `test/config/database.js`*


### Running Tests

To run all tests:
```
npm test
```

To run all MySQL tests:
```
grunt test:mysql
```

To run all SQLite tests:
```
grunt test:sqlite
```

If you don't have `grunt-cli` installed globally, you can run tests with `grunt` like this instead:
```
./node_modules/.bin/grunt test:mysql
```
The above should be run from within the `sequel` project directory.