import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

type Props = {};

const Navbar = (props: Props) => {
  const globalContext = useContext<GlobalContext | null>(GlobalContext);
  const user = JSON.parse(localStorage.getItem("token") as string);
  const channelId = localStorage.getItem("channelId");
  const queryClient = useQueryClient();

  const channelMembers = globalContext?.messages?.channel?.users;
  const isMember = channelMembers?.filter(
    (member) => member?._id === user?.user
  );

  const handleLeaveChannel = async () => {
    if (channelId) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/leaveChannel/${channelId}`,
        {
          userId: user?.user,
          creator: globalContext?.messages?.channel?.createdBy === user?.user,
        },
        {
          headers: {
            Authorization: `Bearer ` + user?.token,
          },
        }
      );

      if (data?.success) {
        toast.success(
          `${
            globalContext?.messages?.channel?.createdBy === user?.user
              ? "Deleted Channel"
              : "Removed from channel"
          }`,
          {
            style: {
              borderRadius: "6px",
              background: "#333",
              color: "#fff",
            },
          }
        );
        if (globalContext?.messages?.channel?.createdBy === user?.user) {
          globalContext?.setChannelId?.("");
        }
      }

      return data;
    }

    return {};
  };
  const leaveMutate = useMutation({
    mutationFn: handleLeaveChannel,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["channel"]);
      // queryClient.invalidateQueries(["messages"]);
    },
  });

  const openNav = () => {
    globalContext?.navRef?.current?.classList.add("min-w-[100%]");
  };

  return (
    <>
      <div className="flex w-full px-5 bg-[#252329] items-center drop-shadow-lg">
        <div className="md:hidden mr-5" onClick={openNav}>
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="h-[74px] w-full bg-[#252329]  md:px-10 flex-1   justify-center  sticky top-0 flex flex-col">
          <div className="flex items-center gap-3">
            {globalContext?.messages?.channel?.name && (
              <img
                src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${globalContext?.messages?.channel?.name}`}
                className="h-9 w-9 mt-1"
              />
            )}
            <p className="font-bold text-lg text-white  md:text-left w-full">
              {globalContext?.messages?.channel?.name
                ? globalContext?.messages?.channel?.name
                : "Welcome to ChatApp!"}
            </p>
          </div>
          {isMember?.length !== 0 && (
            <div className="flex px-12  gap-3  items-center">
              {channelMembers?.map((member) => (
                <p className="text-sm" key={member?._id}>
                  {member?.name === user?.name ? "You" : member?.name}
                </p>
              ))}
            </div>
          )}
        </div>
        {isMember?.length !== 0 && globalContext?.messages?.channel?.name && (
          <div className="cursor-pointer">
            <div className="dropdown dropdown-end ">
              <label tabIndex={0} className="m-1 cursor-pointer">
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
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow w-52 bg-[#2a282c] rounded-md"
              >
                <li onClick={() => leaveMutate.mutate()}>
                  <a className="text-red-500 active:bg-red-500 active:text-white">
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
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    {globalContext?.messages?.channel?.createdBy === user?.user
                      ? "Exit and remove"
                      : "Leave Channel"}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
};

export default Navbar;
