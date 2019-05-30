# BENCH STRENGTH

## The app that provides Team Leaders the ability to assess employee skills and interests to build smarter, more invested teams. 


## Getting Started:

Bench Strength uses a GitHub strategy for authenticaiton. You will need to provide your GitHub credentials along with the instructions below.  


### Prerequisites: 

  Clone repo and cd into stageOne/server.

  Add environment variables to access database in .env file in server folder:

>    `db_user=`*yourUsername*
>
>    `db_password=`*yourPassword*
>
>    `db_database=`*yourDatabase*
>
>    `db_host=`*hostURL*

Run:

`npx sequelize-cli db:migrate`

`npx sequelize-cli db:seed:all`

### Installing:

From stageOne/server:

`npm start`

There is a proxy file that will start the client folder as well. 

Go to localhost:4200

Login with GitHub. 

## Technologies Used:
* Angular 7
* TypeScript
* Sequelize / MySql
* Node / Express
* Auth0 / GitHub 
* AWS 

## Developers:
* Jason Beisiegel: https://github.com/tommaroney
* Michael Fearnley: https://github.com/FearMichael
* Ash Mohney: https://github.com/ashmohney
* Seamus Murphy: https://github.com/turntShramp

