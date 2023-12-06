import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ScrollToTop />
        <Outlet />
        <Toaster
          position="bottom-right"
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                backgroundColor: "rgb(60, 176, 84)",
                color: "white",
                fontWeight: "bold",
              },
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
