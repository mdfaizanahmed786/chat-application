import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { GlobalProvider } from "./context/globalContext";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";

type Props = {
  location: string;
};
function App(location: Props) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(50);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  }, [location.location]);

  return (
    <>
      <LoadingBar
        color="#fff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="flex max-w-full overflow-hidden">
        <GlobalProvider>
          <Sidebar />

          <Chat />
        </GlobalProvider>
      </div>
    </>
  );
}

export default App;
