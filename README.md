# BenchStrength

## Development server

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