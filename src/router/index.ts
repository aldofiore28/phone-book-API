import { Router } from 'express'
import { getPhoneNumbers, createPhoneBookRecord } from '../controllers'
import { checkSchema } from 'express-validator'
import { createPhoneBookRecordSchema } from '../types/schemas'

export const BASE_ROUTE = '/phonebook'

const phoneBookRouter = Router()

phoneBookRouter.get(BASE_ROUTE, getPhoneNumbers)
phoneBookRouter.post(
  BASE_ROUTE,
  checkSchema(createPhoneBookRecordSchema),
  createPhoneBookRecord
)

export default phoneBookRouter
