export interface PhoneBook {
  name: string
  email: string
  address: {
    address1: string
    address2?: string
    city: string
    postcode: string
    country: string
  }
  phoneNumbers: {
    work?: string
    home?: string
    mobile: string
    other?: string
  }
}
