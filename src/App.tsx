import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import {MessagesProvider} from "./context/messagesContext";

function App() {
  return (
    <div className="flex max-w-full overflow-hidden">
      <MessagesProvider>
        <Sidebar />

        <Chat />
      </MessagesProvider>
    </div>
  );
}

export default App;
