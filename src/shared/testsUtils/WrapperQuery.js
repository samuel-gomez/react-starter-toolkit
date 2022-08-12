import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const WrapperQuery = ({ children, queryData = {} }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        queryFn: () => queryData || {},
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default WrapperQuery;
