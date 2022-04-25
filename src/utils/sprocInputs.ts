import { Address, PhoneBook, PhoneNumbers, WithAddressId, WithPhoneNumbersId } from '../types'
import { SQLInputs } from './runStoredProcedure'
import sql from 'mssql'

export const buildSaveAddressSprocInputs = (
  address: Address
): Array<SQLInputs> => [
  {
    name: 'address1',
    type: sql.VarChar(256),
    value: address.address1
  },
  {
    name: 'address2',
    type: sql.VarChar(256),
    value: address.address2
  },
  {
    name: 'city',
    type: sql.VarChar(50),
    value: address.city
  },
  {
    name: 'postcode',
    type: sql.VarChar(20),
    value: address.postcode
  },
  {
    name: 'country',
    type: sql.VarChar(50),
    value: address.country
  }
]

export const buildSavePhoneNumbersSprocInputs = (
  phoneNumbers: PhoneNumbers
): Array<SQLInputs> => [
  {
    name: 'work',
    type: sql.VarChar(20),
    value: phoneNumbers.work
  },
  {
    name: 'home',
    type: sql.VarChar(20),
    value: phoneNumbers.home
  },
  {
    name: 'other',
    type: sql.VarChar(20),
    value: phoneNumbers.other
  },
  {
    name: 'mobile',
    type: sql.VarChar(20),
    value: phoneNumbers.mobile
  },
]

export const buildSaveRecordSprocInputs = (
  {
    email,
    name,
    addressId,
    phoneNumbersId
  }: Partial<PhoneBook & WithPhoneNumbersId & WithAddressId>
): Array<SQLInputs> => [
  {
    name: 'email',
    type: sql.VarChar(256),
    value: email
  },
  {
    name: 'name',
    type: sql.VarChar(256),
    value: name
  },
  {
    name: 'frnPhoneNumbersId',
    type: sql.Int(),
    value: phoneNumbersId
  },
  {
    name: 'frnAddressId',
    type: sql.Int(),
    value: addressId
  },
]
