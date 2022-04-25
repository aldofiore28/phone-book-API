import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import {
  buildValidationErrors,
  runStoredProcedure,
  buildSaveAddressSprocInputs,
  buildSavePhoneNumbersSprocInputs,
  buildSaveRecordSprocInputs,
  buildErrorResponse
} from '../utils'
import { StoredProcedures, WithAddressId, WithPhoneNumbersId } from '../types'

export const createPhoneBookRecord = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json(buildValidationErrors(errors.array()))
  }

  try {
    const addressInputs = buildSaveAddressSprocInputs(req.body.address)
    const phoneNumberInputs = buildSavePhoneNumbersSprocInputs(req.body.phoneNumbers)

    const [addressResult, phoneNumberResult] = await Promise.all([
      runStoredProcedure<WithAddressId>(
        StoredProcedures.SAVE_ADDRESS,
        addressInputs
      ),
      runStoredProcedure<WithPhoneNumbersId>(
        StoredProcedures.SAVE_PHONE_NUMBERS,
        phoneNumberInputs
      )
    ])

    const recordInputs = buildSaveRecordSprocInputs({
      email: req.body.email,
      name: req.body.name,
      phoneNumbersId: phoneNumberResult.phoneNumbersId,
      addressId: addressResult.addressId
    })

    await runStoredProcedure(StoredProcedures.SAVE_RECORD, recordInputs)

    return res.status(201).send()
  } catch (error) {
    return res.status(500).json(buildErrorResponse(error))
  }
}
