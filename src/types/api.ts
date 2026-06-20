export interface Paginated<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export type order = 'asc' | 'desc'

export interface ListParams {
  page?: number
  limit?: number
  sortBy?: string
  order?: order
}

export interface ApiError {
  error: {
    message: string
    statusCode: number
    details?: string | unknown
    stack?: string
  }
}
