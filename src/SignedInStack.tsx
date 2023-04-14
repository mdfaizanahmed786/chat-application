import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation } from "react-router-dom";
import App from "./App";

type Props = {};

const SignedInStack = (props: Props) => {
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token") as string);
    if (!user) {
      window.location.replace("/login");
    }
  }, [location.pathname])
   const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
   });
  return (
    <>
        <QueryClientProvider client={queryClient}>
      <App location={location.pathname} />
      </QueryClientProvider>
    </>
  );
};

export default SignedInStack;
