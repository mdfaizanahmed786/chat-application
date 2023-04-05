import React, { createContext, useRef, useState } from "react";

const GlobalContext = createContext<GlobalContext | null>(null);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState({} as ChannelState
   );
  const [channelId, setChannelId] = useState("");
  const navRef=useRef(null)
  return (
    <GlobalContext.Provider
      value={{ messages, setMessages, channelId, setChannelId, navRef }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

