import React, { useContext } from "react";
import { MessagesContext } from "../context/messagesContext";

type Props = {};

const Messages = (props: Props) => {
  const colorArray=["#3C393F", "#120F13"]
  const messageContext = useContext<MessageContext | null>(MessagesContext);
  console.log(messageContext?.messages);
  return (
    <div>
      {messageContext?.messages?.map(({message}:ArrayOfmessages, i) => (
        <div key={i} className={`flex gap-4 w-full bg-[${colorArray[i%(colorArray.length)]}] px-24 py-10 justify-center   items-center `}>
          <div>
            <img
              src="https://image-upload-nidx.onrender.com/uploads/fifafinal.jpeg"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 justify-center flex-1 ">
            <div className="flex gap-2 items-center">
              <p className="text-[#828282] font-semibold text-lg">Nouman Ahmed</p>
              <p className="text-gray-400 text-sm">yesterday, 4:40PM</p>
            </div>
            <div>
              <p>
dlfjdljfldjf
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
