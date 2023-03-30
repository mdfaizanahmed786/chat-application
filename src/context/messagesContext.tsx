import React, { createContext, useState } from "react";


const MessagesContext=createContext<MessageContext | null>(null);




const MessagesProvider=({children}:{
    children:React.ReactNode
})=>{

    const [messages, setMessages]=useState<ArrayOfmessages[]>([]);
    return (
        <MessagesContext.Provider value={{messages, setMessages}}>
           {children}
        </MessagesContext.Provider>
    )
}


export {MessagesProvider, MessagesContext}