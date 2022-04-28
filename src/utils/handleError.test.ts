import { buildErrorResponse, buildValidationErrors } from './handleError'
import { ValidationError } from 'express-validator'

describe('handleError', () => {
  describe('buildErrorResponse', () => {
    it('builds an error from an instance of Error', () => {
      const errorMessage = 'an error'

      expect(buildErrorResponse(new Error(errorMessage))).toStrictEqual({
        error: errorMessage,
      })
    })

    it('builds an error from stringyfing anything passed in', () => {
      const objectError = { something: 'something' }
      const expected = '{"something":"something"}'

      expect(buildErrorResponse(objectError)).toStrictEqual({
        error: expected,
      })
    })
  })

  describe('buildValidationErrors', () => {
    it('builds an array of errors from the validator response', () => {
      const validationError = {
        msg: 'a message',
        param: 'a param',
      } as ValidationError

      expect(buildValidationErrors([validationError])).toStrictEqual([
        {
          errorMessage: validationError.msg,
          field: validationError.param,
        },
      ])
    })
  })
})
