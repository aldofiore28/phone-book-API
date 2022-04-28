import { Request, Response } from 'express'
import { runStoredProcedure, buildErrorResponse } from '../utils'
import { PhoneBook, PhoneNumbers, StoredProcedures, WithId } from '../types'

export const getPhoneNumbers = async (req: Request, res: Response) => {
  try {
    const phoneNumbers = await runStoredProcedure<
      PhoneNumbers & WithId & Partial<PhoneBook>
    >(StoredProcedures.GET_ALL_PHONE_NUMBERS_PROCEDURE)

    return res.status(200).json(phoneNumbers)
  } catch (error) {
    return res.status(500).json(buildErrorResponse(error))
  }
}
