import React, { useContext, useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { MessagesContext } from "../context/messagesContext";

type Props = {};

const InputContainer = (props: Props) => {
  const messageContext = useContext<MessageContext | null>(MessagesContext);
  console.log(messageContext?.messages);

  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { data } = await axios.post(
      "http://localhost:8001/api/v1/send",
      {
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_AUTHORIZATION,
        },
      }
    );

    console.log(data)
    messageContext?.setMessages?.(data?.allMessages, ...messageContext?.messages);

    setMessage("");
  };

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_API_KEY, {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("trigger-chat", function (data: string) {});

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  return (
    <div className="px-10 py-5 bg-[#120F13] ">
      <form onSubmit={handleSubmit}>
        <div className="flex  py-3 bg-[#3C393F] shadow-md rounded-md">
          <input
            type="text"
            name="chat"
            placeholder="Type a message here"
            className="outline-none border-none flex-1 px-4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
