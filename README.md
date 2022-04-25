# Phone book API

This is an API that will introduce CRUD operation common for a phone book.

## How to install

To make this application work, you are going to need:
* Nodejs >=14.0.0
* npm >=6.0.0
* Docker

To setup the database, follow:
* `$ docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD={{password}}" --name {{nameOfTheContainer}} -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04`
    * This will download the container and run it for the first time
* `$  docker cp setup/databaseSetup.sql sqlserver:/`
    * Run this command from the root of the project
* `$ docker exec -it {{nameOfTheContainer}} "bash"`
    * This will execute bash into the container
* `$ /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P '{{password}}' -i /databaseSetup.sql`
    * This will run the sql script setup that will create the database, tables and stored procedures.

To stop the container, run `docker stop {{nameOfTheContainer}}`

To run it again, run ``docker start {{nameOfTheContainer}}``

If it's the first time running the project, run `npm i` to install the dependencies. Then, create a `.env` file following
the template established in the `.env.example` and add all your local dev environments variables.
To start development, simply run `npm start` to start the server in watch mode. The app won't work without the database
running.

/* deployment instruction here */
