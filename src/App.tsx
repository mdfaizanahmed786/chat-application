import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import {MessagesProvider} from "./context/messagesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="flex max-w-full overflow-hidden">
      <QueryClientProvider client={queryClient}>
      <MessagesProvider>
        <Sidebar />

        <Chat />
      </MessagesProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
