export interface ErrorResponse {
  error: string
}

export const buildErrorResponse = (error: unknown): ErrorResponse => ({
  error: error instanceof Error ? error.message : JSON.stringify(error)
})
