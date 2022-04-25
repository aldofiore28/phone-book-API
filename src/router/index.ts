import { Router } from 'express'
import { getPhoneNumbers, createPhoneBookRecord } from '../controllers'
import { checkSchema } from 'express-validator'
import { createPhoneBookRecordSchema } from '../types/schemas'

export const BASE_ROUTE = '/phonenumbers'

const phoneNumberRouter = Router()

phoneNumberRouter.get(BASE_ROUTE, getPhoneNumbers)
phoneNumberRouter.post(
  BASE_ROUTE,
  checkSchema(createPhoneBookRecordSchema),
  createPhoneBookRecord
)

export default phoneNumberRouter
