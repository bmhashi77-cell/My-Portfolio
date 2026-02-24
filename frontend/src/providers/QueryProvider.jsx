import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60, refetchOnWindowFocus: false },
  },
})

export const QueryProvider = ({ children }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>