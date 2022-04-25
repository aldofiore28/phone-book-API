import sql from 'mssql'
import { extractRecordset } from './extractRecordset'

describe('extractRecordset', () => {
  it('returns an array if the recordset length is > 1', () => {
    const recordset = [1, 2, 3] as sql.IRecordSet<any>

    expect(Array.isArray(extractRecordset(recordset))).toBe(true)
    expect(extractRecordset(recordset)).toEqual([1, 2, 3])
  })

  it('returns a value if the recordset length is 1', () => {
    const recordset = [1] as sql.IRecordSet<any>

    expect(Array.isArray(extractRecordset(recordset))).toBe(false)
    expect(extractRecordset(recordset)).toEqual(1)
  })
})
