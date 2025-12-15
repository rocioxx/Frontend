// Type shim for @tanstack/react-query to allow development without node_modules
declare module '@tanstack/react-query' {
  export interface UseQueryOptions<T = any, E = any> {
    queryKey: any[]
    queryFn: () => Promise<T>
    staleTime?: number
    gcTime?: number
    enabled?: boolean
  }

  export interface UseQueryResult<T = any, E = any> {
    data?: T
    error?: E | null
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    status: 'pending' | 'error' | 'success'
  }

  export function useQuery<T = any, E = any>(options: UseQueryOptions<T, E>): UseQueryResult<T, E>

  export function useQueries<T = any>(options: any): any[]

  export function useMutation<T = any, E = any, V = any>(options: any): any

  export class QueryClient {
    constructor(options?: any)
    queryCache: any
    mutationCache: any
    getDefaultOptions(): any
    setDefaultOptions(options: any): void
    getQueryData(queryKey: any[]): any
    setQueryData(queryKey: any[], updater: any): any
    getQueriesData(filters: any): any[]
    setQueriesData(filters: any, updater: any): any[]
    removeQueries(filters: any): any
    resetQueries(filters: any): Promise<void>
    invalidateQueries(filters: any): Promise<void>
    refetchQueries(filters: any): Promise<any>
    clear(): void
  }

  export interface QueryClientProviderProps {
    client: QueryClient
    children?: React.ReactNode
  }

  export function QueryClientProvider(props: QueryClientProviderProps): any
}
