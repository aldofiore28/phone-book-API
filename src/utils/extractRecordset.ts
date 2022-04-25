import sql from 'mssql'

export const extractRecordset = <T>(
  recordset: sql.IRecordSet<T>
): T | Array<T> => recordset.length > 1 ? recordset : recordset[0]
