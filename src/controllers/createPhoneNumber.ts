import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { buildValidationErrors } from '../utils/handleError'

export const createPhoneBookRecord = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(buildValidationErrors(errors.array()))
  }

  return res.status(200).send()
}
