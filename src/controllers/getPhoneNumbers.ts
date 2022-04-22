import { Request, Response } from 'express'
import sql from 'mssql'

export const getPhoneNumbers = async (req: Request, res: Response) => {
  return res.status(200).json({
    phoneNumber: '123',
  })
}
