import { Router } from 'express'
import { getPhoneNumbers } from '../controllers'

const phoneNumberRouter = Router()

phoneNumberRouter.get('/', getPhoneNumbers)

export default phoneNumberRouter
