import React, { createContext, useState } from "react";

const GlobalContext = createContext<MessageContext | null>(null);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState({} as ChannelState
   );
  const [channelId, setChannelId] = useState("");
  return (
    <GlobalContext.Provider
      value={{ messages, setMessages, channelId, setChannelId }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };

