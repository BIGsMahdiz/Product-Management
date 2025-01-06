import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RouteConfig from "@/router/RouteConfig";
import defaultOptions from "./provider/reactQueryConfig";

function App() {
  const queryClient = new QueryClient({ defaultOptions });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouteConfig />
      </QueryClientProvider>
    </>
  );
}

export default App;
