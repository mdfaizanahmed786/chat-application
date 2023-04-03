import React, { createContext, useState } from "react";

const MessagesContext = createContext<MessageContext | null>(null);

const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState({} as ChannelState
   );
  const [channelId, setChannelId] = useState("");
  return (
    <MessagesContext.Provider
      value={{ messages, setMessages, channelId, setChannelId }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export { MessagesContext, MessagesProvider };
