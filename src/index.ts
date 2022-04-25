import dotenv from 'dotenv'
import mssql from 'mssql'
import { buildApp } from './buildApp'

dotenv.config()

buildApp(mssql, process.env)
