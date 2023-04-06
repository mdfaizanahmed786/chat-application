import React, { useContext, useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { GlobalContext } from "../context/globalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {};

const InputContainer = (props: Props) => {
  const messageContext = useContext<GlobalContext | null>(GlobalContext);
  const queryClient = useQueryClient();
  const loggedInUser = JSON.parse(localStorage.getItem("token") as string);
  const joinedUser = messageContext?.messages?.channel?.users?.filter(
    (user) => user?._id === loggedInUser?.user
  );
  const imageRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList[0] | null>();
  const [image, setImage] = useState();

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

  const messageMutation = useMutation({
    mutationFn: (data: {
      message: string;
      channel: string | undefined;
      name: string | undefined;
    }) =>
      axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/send`,
        {
          message: data.message,
          channelId: data.channel,
          name: data.name,
        },
        {
          headers: {
            Authorization: `Bearer ` + loggedInUser?.token,
            "Content-Type": "application/json",
          },
        }
      ),

    onSuccess: (data) => {
      queryClient.invalidateQueries(["channel"]);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    messageMutation.mutate({
      message,
      channel: messageContext?.messages?.channel?._id,
      name: loggedInUser?.name,
    });

    setMessage("");
  };
  return (
    <div className="md:px-8 px-2 md:py-5 py-3 bg-[#120F13] ">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 md:gap-6">
        {joinedUser?.length !== 0 &&
          messageContext?.messages?.channel?.name && (
            <div className="cursor-pointer ">
              <label htmlFor="my-modal-3" className="cursor-pointer">
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
                    d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                  />
                </svg>
              </label>
            </div>
          )}
        <input
          type="file"
          hidden
          ref={imageRef}
          accept="image/jpg, image/png"
          name="file"
        />

        <div className="flex flex-1 py-2 bg-[#3C393F] shadow-md rounded-md">
          <input
            type="text"
            name="chat"
            placeholder="Type a message here"
            className="outline-none border-none flex-1 px-4 disabled:cursor-not-allowed disabled:opacity-50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={
              joinedUser?.length === 0 ||
              !messageContext?.messages?.channel?.name
            }
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
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-[#120F13]">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className=" font-bold mb-6 text-sm md:text-lg text-center">
          Upload Image (less than 1MB)
          </h3>
        <div className="ring-1 ring-gray-700 rounded-md h-44 flex justify-center items-center w-full" onClick={()=>imageRef?.current?.click()}>
Click here to upload image
        </div>

        </div>
      </div>
    </div>
  );
};

export default React.memo(InputContainer);
