import { QueryClient } from '@tanstack/vue-query'
import { ApiError } from './errors'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //Data remains "fresh" for 30 seconds before a refetch is triggered
      staleTime: 30_000,

      // Unused data is kept in memory for 5 minutes (Garbage Collection)
      gcTime: 5 * 60_000,

      // Prevent refetching every time the user switches browser tabs
      refetchOnWindowFocus: false,

      retry: (failureCount, error) => {
        if (failureCount >= 1) return false
        if (error instanceof ApiError) {
          if (error.status >= 400 && error.status < 500) {
            // Don't retry for client errors (4xx)
            return false
          }
        }
        return true
      },
    },
    mutations: {
      onError: (error) => {
        handleGlobalError(error)
      },
    },
  },
})

function handleGlobalError(error: unknown) {
  const message = error instanceof ApiError ? error.message : 'An unexpected error occurred'

  console.error(`[Global Query Error]: ${message}`)
}
