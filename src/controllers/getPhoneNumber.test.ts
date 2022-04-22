import { Request, Response } from 'express'

const mocks = {
  req: {},
  res: {
    status: jest.fn(),
    json: jest.fn()
  }
}

jest.mock('express', () => ({
  req: mocks.req,
  res: mocks.res
}))

import { getPhoneNumbers } from './getPhoneNumbers'

describe('getPhoneNumber', () => {
  beforeEach(() => {
    mocks.res.status.mockReturnValue(mocks.res)
  })

  it('runs correctly', async () => {
    const result = await getPhoneNumbers(
      mocks.req as Request,
      mocks.res as unknown as Response
    )

    expect(mocks.res.json).toHaveBeenCalledWith({
      phoneNumber: '123'
    })
  })
})
