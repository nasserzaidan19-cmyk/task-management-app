import type { ApiError as ErrorResponse } from '@/types/api'

export class ApiError extends Error {
  public readonly status: number
  public readonly details?: string | unknown
  public readonly stackTrace?: string

  constructor(data: ErrorResponse) {
    super(data.error.message || 'An unexpected error occurred')

    this.name = 'ApiError'
    this.status = data.error.statusCode
    this.details = data.error.details || null
    this.stackTrace = data.error.stack || undefined

    Object.setPrototypeOf(this, ApiError.prototype)
  }

  get isValidationError(): boolean {
    return this.status === 400 || this.status === 422
  }

  getDetails<T = unknown>(): T {
    return this.details as T
  }
}
