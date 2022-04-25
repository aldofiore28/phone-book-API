export interface PhoneBook {
  id: number
  name: string
  email: string
  address: Address
  phoneNumbers: PhoneNumbers
}

export interface Address {
  address1: string
  address2?: string
  city: string
  postcode: string
  country: string
}

export interface PhoneNumbers {
  work?: string
  home?: string
  mobile: string
  other?: string
}

export interface WithId {
  id: number
}

export interface WithAddressId {
  addressId: number
}

export interface WithPhoneNumbersId {
  phoneNumbersId: number
}
