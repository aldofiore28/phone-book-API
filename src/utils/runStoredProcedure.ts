import { StoredProcedures } from '../types'
import sql from 'mssql'
import { GET_ALL_PHONE_NUMBERS_PROCEDURE } from '../services/getAllPhoneNumbers'

export const runStoredProcedure = async <T>(
  procedure: StoredProcedures
): Promise<Array<T>> => {
  const result = await new sql.Request()
    .execute(procedure)

  return result.recordset
}
