import { Schema } from 'express-validator'

export const createPhoneBookRecordSchema: Schema = Object.freeze({
  name: {
    isString: true,
    trim: true,
  },
  email: {
    isEmail: true,
    isString: true,
    trim: true,
    errorMessage: 'Invalid email',
  },
  phoneNumbers: {
    isObject: true,
  },
  'phoneNumbers.work': {
    isString: true,
    trim: true,
    optional: {
      options: {
        nullable: true,
      },
    },
  },
  'phoneNumbers.home': {
    isString: true,
    trim: true,
    optional: {
      options: {
        nullable: true,
      },
    },
  },
  'phoneNumbers.mobile': {
    isString: true,
    trim: true,
  },
  'phoneNumbers.other': {
    isString: true,
    trim: true,
    optional: {
      options: {
        nullable: true,
      },
    },
  },
  address: {
    isObject: true,
  },
  'address.address1': {
    isString: true,
    trim: true,
  },
  'address.address2': {
    isString: true,
    trim: true,
    optional: {
      options: {
        nullable: true,
      },
    },
  },
  'address.city': {
    isString: true,
    trim: true,
  },
  'address.postcode': {
    isString: true,
    trim: true,
  },
  'address.country': {
    isString: true,
  },
})
