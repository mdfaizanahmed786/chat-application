import { useContext } from "react";
import { MessagesContext } from "../context/messagesContext";

type Props = {};

const Navbar = (props: Props) => {
  const messageContext = useContext<MessageContext | null>(MessagesContext);

  const channelMembers = messageContext?.messages?.channel?.users;

  return (
    <div className="flex w-full px-5 bg-[#252329] items-center">
      <div className="h-[72px] w-full bg-[#252329] drop-shadow-lg px-10 flex-1   justify-center  sticky top-0 flex flex-col">
        <div className="flex  items-center gap-3">
          {messageContext?.messages?.channel?.name && (
            <img
              src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${messageContext?.messages?.channel?.name}`}
              className="h-9 w-9 "
            />
          )}
          <p className="font-bold text-lg text-white">
            {messageContext?.messages?.channel?.name
              ? messageContext?.messages?.channel?.name
              : "Select or join a channel to chat!"}
          </p>
        </div>
        <div className="flex px-12 gap-3  items-center">
          {channelMembers?.map((member) => (
            <p className="text-xs" key={member?._id}>
              {member?.name}
            </p>
          ))}
        </div>
      </div>
      <div className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hover:text-white transition"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
