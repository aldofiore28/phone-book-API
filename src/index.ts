import express from 'express'
import dotenv from 'dotenv'
import router from './router'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5000

app.use(router)

app.listen(port, () => console.log(`Running on port ${port}`))
