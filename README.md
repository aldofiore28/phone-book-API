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
the template established in the `.env.example` and add all your local environments variables.
To start development, simply run `npm start` to start the server in watch mode. The app won't work without the database
running.

# Technical choices and tradeoffs

I have opted to use `mssql` and `express` for my familiarity with the packages. For this specific application, I didn't think
using any specific framework would have helped me in any way, especially if I was trying to produce production ready code
in the time given to me.
By using `mssql`, I had to give up a some maintainability on the db side simply because I am not confident using an ORM (`Prisma` for example)
and thought it would just slow me down.
I also used `supertest` and `jest` for my testing suite because I believe they are the best tools for the job, very flexible
and easy to use and setup.

There are a lot of things that I would have done with more time for sure:
* Finish all the other tasks (I felt like finishing them would take me well over the 3 hours of work I had, and I don't believe would represent production ready code at that timespan)
  * Implemented JWT 
  * Pagination and sorting
  * I believe these 2 would be more useful to show off during integration testing as well.
* Implemented an ORM (ease of use, maintainability and fewer context switching between SQL and TS)
* More setup around my testing suite (I only have installed the packages and use them due to time limit)
* Easier initial start-up of the project (I would create a docker-compose.yaml to spin up both a node and SQL instance, as well as automate the initial setup)
  * Did not opt for this one because of time, the current setup was very straight forward.
* Additional setup for express (cors, rate limit and other middlewares)
* Hosting the DB to run e2e tests with an actual database as a final step.

You can contact me on [Github](https://github.com/aldofiore28) and [Stack Overflow](https://stackoverflow.com/users/11095959/aldo-fiore).
