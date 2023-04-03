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


interface Channel  {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
  users: {
    _id: string;
    name: string;
    email: string;
  }[];
  updatedAt: string;
};

interface Channels{
  channels: Channel[];
}

type User={
  _id:string;
  email:string;
  channels:string[];
  name:string;
  
}