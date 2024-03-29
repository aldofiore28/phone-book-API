import { StoredProcedures } from '../types'
import sql from 'mssql'

export interface SQLInputs {
  name: string
  type: sql.ISqlType
  value: unknown
}

export const runStoredProcedure = async <T>(
  procedure: StoredProcedures,
  inputs?: Array<SQLInputs>
): Promise<sql.IRecordSet<T>> => {
  const request = await new sql.Request()

  inputs?.length &&
    inputs.forEach((input) => {
      request.input(input.name, input.type, input.value)
    })

  const result = await request.execute(procedure)

  return result.recordset
}
