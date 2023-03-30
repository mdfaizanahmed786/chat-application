interface ArrayOfmessages {
  _id: string;
  message: string;
  userId: {
    name: string;
    _id: string;
  };
  createdAt: string;
}
type MessageContext = {
  messages: ArrayOfmessages[];
  setMessages:Dispatch<SetStateAction<{ message: string; }[]>>
};

interface PusherMessage extends ArrayOfmessages {
allMessages: ArrayOfmessages[];
}
