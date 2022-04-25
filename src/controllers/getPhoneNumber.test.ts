import { Request, Response } from 'express'
import { PhoneNumbers, WithId } from '../types'

const mocks = {
  req: {},
  res: {
    status: jest.fn(),
    json: jest.fn()
  },
  runStoredProcedure: jest.fn()
}

jest.mock('express', () => ({
  req: mocks.req,
  res: mocks.res
}))

jest.mock('../utils/runStoredProcedure', () => ({
  runStoredProcedure: mocks.runStoredProcedure
}))

import { getPhoneNumbers } from './getPhoneNumbers'

describe('getPhoneNumber', () => {
  beforeEach(() => {
    mocks.res.status.mockReturnValue(mocks.res)
  })

  afterEach(() => {
    mocks.res.status.mockReset()
    mocks.res.json.mockReset()
    mocks.runStoredProcedure.mockReset()
  })

  it('returns a status of 500 if the database calls throws', async () => {
    const errorMessage = 'an error'
    mocks.runStoredProcedure.mockImplementationOnce(() => {
      throw new Error(errorMessage)
    })

    try {
      await getPhoneNumbers(
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

  it('returns a status of 200 the phone numbers given from the sproc', async () => {
    const phoneNumbersMock = {
      id: 123
    } as PhoneNumbers & WithId

    mocks.runStoredProcedure.mockResolvedValueOnce([phoneNumbersMock])

    await getPhoneNumbers(
      mocks.req as Request,
      mocks.res as unknown as Response
    )

    expect(mocks.res.status).toHaveBeenCalledWith(200)
    expect(mocks.res.json).toHaveBeenCalledWith([phoneNumbersMock])
  })
})
