import { ValidationError } from 'express-validator'

export interface ErrorResponse {
  error: string
}

export interface ValidationErrorInformation {
  errorMessage: string
  field: string
}

export const buildErrorResponse = (error: unknown): ErrorResponse => ({
  error: error instanceof Error ? error.message : JSON.stringify(error)
})

export const buildValidationErrors = (errors: ValidationError[]): ValidationErrorInformation[] =>
  errors.map(error => ({
    errorMessage: error.msg,
    field: error.param
  }))
