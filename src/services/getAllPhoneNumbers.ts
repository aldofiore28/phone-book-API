import { PhoneNumbers, StoredProcedures, WithId } from '../types'
import { runStoredProcedure } from '../utils/runStoredProcedure'

export const GET_ALL_PHONE_NUMBERS_PROCEDURE = 'getAllPhoneNumbers'

export const getAllPhoneNumbers =
  async (): Promise<Array<PhoneNumbers & WithId>> =>
    runStoredProcedure<PhoneNumbers & WithId>(
      StoredProcedures.GET_ALL_PHONE_NUMBERS_PROCEDURE
    )
