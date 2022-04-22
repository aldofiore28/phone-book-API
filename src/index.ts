import express from 'express'
import dotenv from 'dotenv'
import phoneNumberRouter from './router'
import sql, { config as sqlConfig } from 'mssql'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5000
const databaseOptions: sqlConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_TARGET,
  server: process.env.DATABASE_SERVER as string,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

app.use(phoneNumberRouter)

export const start = async () => {
  try {
    await sql.connect(databaseOptions)
    app.listen(port, () => console.log(`Running on port ${port}`))
  } catch (error) {
    console.log('Could not start the app')
    console.log(error)
  }
}

start()
