import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[]
}

interface EntityError {
  status: 422
  data: {
    error: ErrorFormObject
  }
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return error instanceof Object && error !== null && 'status' in error
}

export function isSerializedError(error: unknown): error is SerializedError {
  return error instanceof Object && error !== null && 'message' in error
}

export function isEntityError(error: unknown): error is EntityError {
  return (
    isFetchBaseQueryError(error) &&
    error.status == 422 &&
    error.data instanceof Object &&
    error.data != null &&
    !(error.data instanceof Array)
  )
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return error instanceof Object && error !== null && 'message' in error && typeof (error as any).message === 'string'
}

export class CustomizedError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CustomizedError'
  }
}
