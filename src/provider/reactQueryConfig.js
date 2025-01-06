const defaultOptions = {
  queries: {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000,
    retry: 1,
  },
};

export default defaultOptions;
