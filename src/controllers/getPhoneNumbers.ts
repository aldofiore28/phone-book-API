import { Request, Response } from 'express'
import { runStoredProcedure } from '../utils/runStoredProcedure'
import { PhoneNumbers, StoredProcedures, WithId } from '../types'
import { buildErrorResponse } from '../utils/handleError'

export const getPhoneNumbers = async (req: Request, res: Response) => {
  try {
    const phoneNumbers = await runStoredProcedure<PhoneNumbers & WithId>(
      StoredProcedures.GET_ALL_PHONE_NUMBERS_PROCEDURE
    )

    return res.status(200).json(phoneNumbers)
  } catch (error) {
    res.status(500).json(buildErrorResponse(error))
  }
}
