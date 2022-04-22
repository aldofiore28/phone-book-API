import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 5000

app.get('/', (req, res) => {
  res.status(200).send()
})

app.listen(port, () => console.log(`Running on port ${port}`))
