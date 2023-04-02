import { Routes } from "react-router";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { MessagesProvider } from "./context/messagesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingBar from "react-top-loading-bar";
import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom'

type Props={
  location:string
}
function App(location:Props) {
  const queryClient = new QueryClient();
  const [progress, setProgress]=useState(0)
  useEffect(()=>{
    setProgress(50)
    setTimeout(()=>{
      setProgress(100)

    },100)
  },[location.location])
 
  return (
    <>
     <LoadingBar
        color='#fff'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    
    <div className="flex max-w-full overflow-hidden">

      <QueryClientProvider client={queryClient}>
      
          <MessagesProvider>
            <Sidebar />

            <Chat />
          </MessagesProvider>
       
      </QueryClientProvider>
    </div>
    </>
  );
}

export default App;
