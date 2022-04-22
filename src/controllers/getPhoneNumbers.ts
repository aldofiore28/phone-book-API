import { Request, Response } from 'express'
import { runStoredProcedure } from '../utils/runStoredProcedure'
import { PhoneNumbers, StoredProcedures, WithId } from '../types'

export const getPhoneNumbers = async (req: Request, res: Response) => {
  const phoneNumbers = await runStoredProcedure<PhoneNumbers & WithId>(
    StoredProcedures.GET_ALL_PHONE_NUMBERS_PROCEDURE
  )

  return res.status(200).json(phoneNumbers)
}
