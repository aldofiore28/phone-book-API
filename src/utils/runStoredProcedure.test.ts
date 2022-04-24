import { StoredProcedures } from '../types'

const mocks = {
  storedProcedureName: 'a procedure' as StoredProcedures,
  sql: {
    Request: jest.fn()
  },
  execute: jest.fn()
}

jest.mock('mssql', () => ({
  __esModule: true,
  default: mocks.sql
}))

import { runStoredProcedure } from './runStoredProcedure'

describe('runStoredProcedure', () => {
  beforeEach(() => {
    mocks.sql.Request.mockImplementation(() => ({
      execute: mocks.execute
    }))
  })

  afterEach(() => {
    mocks.sql.Request.mockClear()
    mocks.execute.mockClear()
  })

  it('returns data from the setup', async () => {
    const anyData = {
      a: 1
    }

    mocks.execute.mockResolvedValue({
      recordset: [anyData]
    })

    const result = await runStoredProcedure(mocks.storedProcedureName)

    expect(mocks.execute).toHaveBeenCalledWith(mocks.storedProcedureName)
    expect(result).toStrictEqual([anyData])
  })
})
