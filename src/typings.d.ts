interface ArrayOfmessages {
  _id: string;
  message: string;
  user: {
    name: string;
    _id: string;
    email?: string;
  };
  createdAt: string;
}

interface NewChannel  {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy?: string;
  users: {
    _id: string;
    name: string;
    email: string;
  }[];
  updatedAt?: string;
   messages:ArrayOfmessages[];
};




interface ChannelState {
  channel:NewChannel;

}






type GlobalContext = {
  messages: ChannelState;
  setMessages:Dispatch<SetStateAction<{ message: string; }[]>>
  channelId:string;
  setChannelId:Dispatch<SetStateAction<string>>
  navRef:RefObject<NavigationContainerRef>
};

interface PusherMessage  {
channel: ArrayOfmessages[];
}


interface Channel  {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy?: string;
  users: {
    _id: string;
    name: string;
    email: string;
  }[];
  updatedAt?: string;
    messages:ArrayOfmessages[];
};

interface Channels{
  channels: Channel[];
}

type User={
  _id:string;
  email:string;
  channels:Channel[];
  name:string;
  
}