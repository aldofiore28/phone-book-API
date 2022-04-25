import express, { Express } from 'express'
import phoneBookRouter from './router'
import { config as sqlConfig } from 'mssql'

export const buildApp = async (sql: any, env: NodeJS.ProcessEnv): Promise<Express> => {
  const app = express()
  const port = env.APP_PORT || 5000
  const databaseOptions: sqlConfig = {
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_TARGET,
    server: env.DATABASE_SERVER as string,
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

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(phoneBookRouter)

  try {
    await sql.connect(databaseOptions)
    app.listen(port, () => console.log(`Running on port ${port}`))
  } catch (error) {
    console.log('Could not start the app')
    console.log(error)
  }

  return app
}
