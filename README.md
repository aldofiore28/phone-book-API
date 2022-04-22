# Phone book API

This is an API that will introduce CRUD operation common for a phone book.

## How to install

To make this application work, you are going to need:
* Nodejs >=14.0.0
* npm >=6.0.0
* Docker

To install your database, run this command

`docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD={{password}}" --name {{nameOfTheContainer}} -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04`

This will download and run the container for the first time.

To stop the container, run `docker stop {{nameOfTheContainer}}`

To run it again, run ``docker start {{nameOfTheContainer}}``

To start development, simply run `npm start` to start the server in watch mode. This command won't work by itself if the
database container isn't running.

/* deployment instruction here */
