import { StoredProcedures } from '../types'
import sql from 'mssql'

export const runStoredProcedure = async <T>(
  procedure: StoredProcedures
): Promise<Array<T>> => {
  const result = await new sql.Request()
    .execute(procedure)

  return result.recordset
}
