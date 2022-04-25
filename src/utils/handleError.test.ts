import { buildErrorResponse } from './handleError'

describe('buildErrorResponse', () => {
  it('builds an error from an instance of Error', () => {
    const errorMessage = 'an error'

    expect(buildErrorResponse(new Error(errorMessage))).toStrictEqual({
      error: errorMessage
    })
  })

  it('builds an error from stringying anything passed in', () => {
    const objectError = {something: 'something'}
    const expected = "{\"something\":\"something\"}"

    expect(buildErrorResponse(objectError)).toStrictEqual({
      error: expected
    })
  })
})
