import React, { useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { MessagesContext } from "../context/messagesContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {};

const InputContainer = (props: Props) => {
  const messageContext = useContext<MessageContext | null>(MessagesContext);
  const queryClient = useQueryClient();
  const loggedInUser = JSON.parse(localStorage.getItem("token") as string);
  const joinedUser = messageContext?.messages?.channel?.users?.filter(
    (user) => user?._id === loggedInUser?.user
  );

  const [message, setMessage] = useState("");

  
  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_API_KEY, {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("trigger-chat", function (data: ChannelState) {
      messageContext?.setMessages?.({
        ...messageContext?.messages,
        channel: data?.channel,
      });
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

 const messageMutation=useMutation({
   mutationFn: (data: { message: string; channel: string | undefined }) =>
   axios.post(
     `${import.meta.env.VITE_BACKEND}/api/v1/send`,
     {
       message: data.message,
       channelId: data.channel,
      },
      {
        headers: {
          Authorization: `Bearer ` + loggedInUser?.token,
          "Content-Type": "application/json",
        },
      }
      ),
      
      onSuccess: (data) => {
        // messageContext?.setMessages?.({
        //   ...messageContext?.messages,
        //   channel: data?.data?.channel,
        // });
        queryClient.invalidateQueries(['channel'])
      }
      
    })
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
     
      messageMutation.mutate({
        message,
        channel: messageContext?.messages?.channel?._id,
      });
  
      setMessage("");
    };
  return (
    <div className="px-10 py-5 bg-[#120F13] ">
      <form onSubmit={handleSubmit}>
        <div className="flex  py-2 bg-[#3C393F] shadow-md rounded-md">
          <input
            type="text"
            name="chat"
            placeholder="Type a message here"
            className="outline-none border-none flex-1 px-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={joinedUser?.length === 0}
          />
          <button
            disabled={!message}
            type="submit"
            className={` ${
              !message ? "text-gray-600" : "text-[#2D9CDB] hover:text-white"
            } px-2 -rotate-45  transition  rounded-md py-1 disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(InputContainer);
