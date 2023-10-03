import { AnyAction, isRejected, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { CustomizedError, isEntityError } from './ErrorHelper'

function isPayloadErrorMessage(payload: unknown): payload is {
  data: {
    error: string
  }
  status: number
} {
  return (
    typeof payload === 'object' &&
    payload != null &&
    'data' in payload &&
    typeof (payload as any).data.error === 'string'
  )
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action: AnyAction) => {
  if (isRejected(action)) {
    if (action.error instanceof CustomizedError) {
      console.warn(action.error.message)
    }
  }

  if (isRejectedWithValue(action)) {
    if (isPayloadErrorMessage(action.payload)) {
      console.warn(action.payload.data.error)
    } else if (!isEntityError(action.payload)) {
      console.warn(action.error.message)
    }
  }

  return next(action)
}
