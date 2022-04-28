import { StoredProcedures } from '../types'

const mocks = {
  storedProcedureName: 'a procedure' as StoredProcedures,
  sql: {
    Request: jest.fn(),
  },
  execute: jest.fn(),
  input: jest.fn(),
}

jest.mock('mssql', () => ({
  __esModule: true,
  default: mocks.sql,
}))

// eslint-disable-next-line import/first
import { runStoredProcedure, SQLInputs } from './runStoredProcedure'

describe.only('runStoredProcedure', () => {
  beforeEach(() => {
    mocks.sql.Request.mockImplementation(() => ({
      execute: mocks.execute,
      input: mocks.input,
    }))
  })

  afterEach(() => {
    mocks.sql.Request.mockClear()
    mocks.execute.mockClear()
  })

  it('runs a sproc without inputs and returns data from the db', async () => {
    const anyData = {
      a: 1,
    }

    mocks.execute.mockResolvedValueOnce({
      recordset: [anyData],
    })

    const result = await runStoredProcedure(mocks.storedProcedureName)

    expect(mocks.execute).toHaveBeenCalledWith(mocks.storedProcedureName)
    expect(result).toStrictEqual([anyData])
  })

  it('runs a sproc with inputs and returns data from the db if present', async () => {
    const anyData = {
      a: 1,
    }

    const input: SQLInputs = {
      name: 'a name',
      type: {} as any,
      value: 1,
    }

    mocks.execute.mockResolvedValueOnce({
      recordset: [anyData],
    })

    const result = await runStoredProcedure(mocks.storedProcedureName, [input])

    expect(mocks.input).toHaveBeenCalledWith(
      input.name,
      input.type,
      input.value
    )
    expect(mocks.execute).toHaveBeenCalledWith(mocks.storedProcedureName)
    expect(result).toStrictEqual([anyData])
  })

  it('runs a sproc with inputs and returns undefined if no data need to be retrieved from the db', async () => {
    mocks.execute.mockResolvedValueOnce({
      recordset: undefined,
    })

    const result = await runStoredProcedure(mocks.storedProcedureName)

    expect(mocks.execute).toHaveBeenCalledWith(mocks.storedProcedureName)
    expect(result).toBeUndefined()
  })
})
