import { Request, Response } from 'express'
import { ValidationError } from 'express-validator'
import {
  buildSaveAddressSprocInputs,
  buildSavePhoneNumbersSprocInputs,
  buildSaveRecordSprocInputs
} from '../utils/sprocInputs'
import { ValidationErrorInformation } from '../utils/handleError'
import { StoredProcedures, WithAddressId, WithPhoneNumbersId } from '../types'

const mocks = {
  req: {
    body: {
      email: 'an email',
      name: 'a name',
      address: {
        address1: 'address1',
        city: 'a city',
        postcode: 'a postcode',
        country: 'a country'
      },
      phoneNumbers: {
        home: '123',
        work: '456',
        other: '789',
        mobile: '012'
      }
    }
  },
  res: {
    status: jest.fn(),
    json: jest.fn(),
    send: jest.fn()
  },
  runStoredProcedure: jest.fn(),
  validationResult: jest.fn(),
  isEmpty: jest.fn().mockReturnValue(true),
  array: jest.fn().mockReturnValue([])
}

jest.mock('express', () => ({
  req: mocks.req,
  res: mocks.res
}))

jest.mock('../utils/runStoredProcedure', () => ({
  runStoredProcedure: mocks.runStoredProcedure
}))

jest.mock('express-validator', () => ({
  validationResult: mocks.validationResult
}))

import { createPhoneBookRecord } from './createPhoneBookRecord'

describe('createPhoneBookRecord', () => {
  beforeEach(() => {
    mocks.validationResult.mockReturnValue({
      isEmpty: mocks.isEmpty,
      array: mocks.array
    })

    mocks.res.status.mockReturnValue(mocks.res)
  })

  afterEach(() => {
    mocks.res.status.mockClear()
    mocks.res.json.mockClear()
    mocks.runStoredProcedure.mockClear()
    mocks.validationResult.mockClear()
    mocks.isEmpty.mockClear()
    mocks.array.mockClear()
  })

  it('returns 400 and validation errors if it failed validation', async () => {
    const validationError = {
      msg: 'an error',
      param: 'a field'
    } as ValidationError

    mocks.array.mockReturnValueOnce([validationError])
    mocks.isEmpty.mockReturnValueOnce(false)

    await createPhoneBookRecord(
      mocks.req as Request,
      mocks.res as unknown as Response
    )

    expect(mocks.res.status).toHaveBeenCalledWith(400)
    expect(mocks.res.json).toHaveBeenCalledWith([{
      errorMessage: validationError.msg,
      field: validationError.param
    }] as Array<ValidationErrorInformation>)
  })

  it('returns 500 if the database calls throws', async () => {
    const errorMessage = 'an error'
    mocks.runStoredProcedure.mockImplementationOnce(() => {
      throw new Error(errorMessage)
    })

    try {
      await createPhoneBookRecord(
        mocks.req as Request,
        mocks.res as unknown as Response
      )
    } catch (error) {
      expect(mocks.res.status).toHaveBeenCalledWith(500)
      expect(mocks.res.json).toHaveBeenCalledWith({
        error: errorMessage
      })
    }
  })

  it('returns 500 if the addressId is not returned from the database', async () => {
    mocks.runStoredProcedure.mockResolvedValueOnce([] as Array<WithAddressId>)

    mocks.runStoredProcedure.mockResolvedValueOnce([{
      phoneNumbersId: 456
    }] as Array<WithPhoneNumbersId>)

    await createPhoneBookRecord(
      mocks.req as Request,
      mocks.res as unknown as Response
    )

    expect(mocks.res.status).toHaveBeenCalledWith(500)
    expect(mocks.res.json).toHaveBeenCalledWith({
      error: 'Unexpected error'
    })
  })

  it('returns 500 if the addressId is not returned from the database', async () => {
    mocks.runStoredProcedure.mockResolvedValueOnce([{
      addressId: 123
    }] as Array<WithAddressId>)

    mocks.runStoredProcedure.mockResolvedValueOnce([] as Array<WithPhoneNumbersId>)

    await createPhoneBookRecord(
      mocks.req as Request,
      mocks.res as unknown as Response
    )

    expect(mocks.res.status).toHaveBeenCalledWith(500)
    expect(mocks.res.json).toHaveBeenCalledWith({
      error: 'Unexpected error'
    })
  })

  it('returns 201 and calls all the sprocs', async () => {
    mocks.runStoredProcedure.mockResolvedValueOnce([{
      addressId: 123
    }] as Array<WithAddressId>)

    mocks.runStoredProcedure.mockResolvedValueOnce([{
      phoneNumbersId: 456
    }] as Array<WithPhoneNumbersId>)


    await createPhoneBookRecord(
      mocks.req as Request,
      mocks.res as unknown as Response
    )

    expect(mocks.res.status).toHaveBeenCalledWith(201)
    expect(mocks.runStoredProcedure).toHaveBeenCalledTimes(3)
    expect(mocks.runStoredProcedure).toHaveBeenNthCalledWith(
      1,
      StoredProcedures.SAVE_ADDRESS,
      buildSaveAddressSprocInputs(mocks.req.body.address)
    )

    expect(mocks.runStoredProcedure).toHaveBeenNthCalledWith(
      2,
      StoredProcedures.SAVE_PHONE_NUMBERS,
      buildSavePhoneNumbersSprocInputs(mocks.req.body.phoneNumbers)
    )

    expect(mocks.runStoredProcedure).toHaveBeenNthCalledWith(
      3,
      StoredProcedures.SAVE_RECORD,
      buildSaveRecordSprocInputs({
        name: mocks.req.body.name,
        email: mocks.req.body.email,
        addressId: 123,
        phoneNumbersId: 456
      })
    )
  })
})
