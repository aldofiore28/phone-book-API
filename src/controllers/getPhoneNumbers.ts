import { Request, Response } from 'express'
import { getAllPhoneNumbers } from '../services/getAllPhoneNumbers'

export const getPhoneNumbers = async (req: Request, res: Response) => {
  const phoneNumbers = await getAllPhoneNumbers()

  return res.status(200).json(phoneNumbers)
}
