import { ApiError } from '@/lib/errors'
import type { ApiError as ErrorResponse } from '@/types/api'

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const isDev = import.meta.env.DEV
  const baseUrl = import.meta.env.VITE_API_URL.replace(/\/$/, '')
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  const url = `${baseUrl}${cleanEndpoint}`

  if (isDev) {
    console.log(
      `%c[API Request] ${options.method || 'GET'} -> ${cleanEndpoint}`,
      'color: #3b82f6; font-weight: bold;',
      {
        body: options.body ? JSON.parse(options.body as string) : null,
        options,
      }
    )
  }

  const headers = new Headers(options.headers)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  }

  try {
    const startTime = performance.now()
    const response = await fetch(url, config)
    const duration = (performance.now() - startTime).toFixed(0)
    if (response.status === 204) {
      return {} as T
    }

    const text = await response.text()
    let data: unknown
    try {
      data = text ? JSON.parse(text) : {}
    } catch (parseError) {
      throw new Error('API returned an invalid response format (JSON expected)', {
        cause: parseError,
      })
    }

    if (isDev) {
      const color = response.ok ? '#10b981' : '#f43f5e'
      console.log(
        `%c[API Response] ${response.status} <- ${cleanEndpoint} (${duration}ms)`,
        `color: ${color}; font-weight: bold;`,
        data
      )
    }

    if (!response.ok) {
      const errorData = data as ErrorResponse
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('auth:expired'))
      }
      throw new ApiError(errorData)
    }
    return data as T
  } catch (error) {
    if (error instanceof ApiError) throw error

    throw new Error(error instanceof Error ? error.message : 'Network Connection Error', {
      cause: error,
    })
  }
}
