import { PhoneBook, PhoneNumbers, WithId } from '../src/types'
import { Express } from 'express'

const mocks = {
  sql: {
    Request: jest.fn(),
    connect: jest.fn(),
    input: jest.fn(),
    execute: jest.fn(),
    VarChar: jest.fn(),
    Int: jest.fn()
  },
  env: {
    APP_PORT: '1234',
    DATABASE_USER: 'a user',
    DATABASE_PASSWORD: 'a password',
    DATABASE_TARGET: 'a database',
    DATABASE_SERVER: 'a server'
  } as NodeJS.ProcessEnv
}

jest.mock('mssql', () => ({
  __esModule: true,
  default: mocks.sql
}))

import request from 'supertest'
import { BASE_ROUTE } from '../src/router'
import { buildApp } from '../src/buildApp'

describe('Integration tests', () => {
  let app: Express

  beforeAll(async () => {
    app = await buildApp(mocks.sql, mocks.env)
  })

  describe(`GET ${BASE_ROUTE}`, () => {
    beforeEach(() => {
      mocks.sql.Request.mockImplementation(() => ({
        input: mocks.sql.input,
        execute: mocks.sql.execute
      }))
    })

    afterEach(() => {
      mocks.sql.Request.mockClear()
      mocks.sql.connect.mockClear()
      mocks.sql.input.mockClear()
      mocks.sql.execute.mockClear()
    })

    it('returns 200 and basic data', async () => {
      const basicJson = {
        id: 123,
        mobile: '070000000'
      } as PhoneNumbers & WithId

      mocks.sql.execute.mockResolvedValueOnce({ recordset: [basicJson] })

      await request(app)
        .get(BASE_ROUTE)
        .expect('Content-Type', /json/)
        .expect(200)
    })
  })

  describe(`POST ${BASE_ROUTE}`, () => {
    beforeEach(() => {
      mocks.sql.Request.mockImplementation(() => ({
        input: mocks.sql.input,
        execute: mocks.sql.execute
      }))
    })

    afterEach(() => {
      mocks.sql.Request.mockClear()
      mocks.sql.connect.mockClear()
      mocks.sql.input.mockClear()
      mocks.sql.execute.mockClear()
    })

    it('Returns 400 and all validation errors for required fields', async () => {
      await request(app)
        .post(BASE_ROUTE)
        .send({})
        .set({ 'Accept': 'application/json' })
        .expect(400)
        .expect([
          { errorMessage: 'Invalid value', field: 'name' },
          { errorMessage: 'Invalid email', field: 'email' },
          { errorMessage: 'Invalid email', field: 'email' },
          { errorMessage: 'Invalid value', field: 'phoneNumbers' },
          { errorMessage: 'Invalid value', field: 'phoneNumbers.mobile' },
          { errorMessage: 'Invalid value', field: 'address' },
          { errorMessage: 'Invalid value', field: 'address.address1' },
          { errorMessage: 'Invalid value', field: 'address.city' },
          { errorMessage: 'Invalid value', field: 'address.postcode' },
          { errorMessage: 'Invalid value', field: 'address.country' }
        ])
    })

    it('Returns 500 with a valid body but an error when retrieving the addressId', async () => {
      // mocks return of the addressId after save
      mocks.sql.execute.mockResolvedValueOnce({
        recordset: []
      })

      // mocks return of the phoneNumberId after save
      mocks.sql.execute.mockResolvedValueOnce({
        recordset: [{
          phoneNumbersId: '123'
        }]
      })

      await request(app)
        .post(BASE_ROUTE)
        .send({
          name: 'a name',
          email: 'aldo.fiore@email.com',
          address: {
            address1: 'an address',
            city: 'Bath',
            postcode: 'a postcode',
            country: 'United Kingdom'
          },
          phoneNumbers: {
            mobile: '070000000'
          }
        } as PhoneBook)
        .set({ 'Accept': 'application/json' })
        .expect(500)
    })

    it('Returns 500 with a valid body but an error when retrieving the phoneNumbersId', async () => {
      // mocks return of the addressId after save
      mocks.sql.execute.mockResolvedValueOnce({
        recordset: [{
          addressId: '123'
        }]
      })

      // mocks return of the phoneNumberId after save
      mocks.sql.execute.mockResolvedValueOnce({
        recordset: []
      })

      await request(app)
        .post(BASE_ROUTE)
        .send({
          name: 'a name',
          email: 'aldo.fiore@email.com',
          address: {
            address1: 'an address',
            city: 'Bath',
            postcode: 'a postcode',
            country: 'United Kingdom'
          },
          phoneNumbers: {
            mobile: '070000000'
          }
        } as PhoneBook)
        .set({ 'Accept': 'application/json' })
        .expect(500)
    })

    it('Returns 201 with a valid body', async () => {
      // mocks return of the addressId after save
      mocks.sql.execute.mockResolvedValueOnce({
        recordset: [{
          addressId: '123'
        }]
      })

      // mocks return of the phoneNumberId after save
      mocks.sql.execute.mockResolvedValueOnce({
        recordset: [{
          phoneNumbersId: '123'
        }]
      })

      // mocks return of the phoneNumberId after save
      mocks.sql.execute.mockResolvedValueOnce({
        recordset: undefined
      })

      await request(app)
        .post(BASE_ROUTE)
        .send({
          name: 'a name',
          email: 'aldo.fiore@email.com',
          address: {
            address1: 'an address',
            city: 'Bath',
            postcode: 'a postcode',
            country: 'United Kingdom'
          },
          phoneNumbers: {
            mobile: '070000000'
          }
        } as PhoneBook)
        .set({ 'Accept': 'application/json' })
        .expect(201)
    })
  })
})
