type ArrayOfmessages={message:string}
type MessageContext = {
  messages: ArrayOfmessages[];
  setMessages:Dispatch<SetStateAction<{ message: string; }[]>>
};
