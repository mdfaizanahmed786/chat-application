import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

type Props = {
  debounced: string;
};

const Channels = ({ debounced }: Props) => {
  const queryClient = useQueryClient();
  const [channelName, setChannelName] = useState<string>("");
  const [channelId, setChannelId] = useState("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const user = JSON.parse(localStorage.getItem("token") as string);

  const fetchChannels = async (search: string) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/v1/channel?cname=${search}`,
      {
        headers: {
          Authorization: `Bearer ` + user?.token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  // Function to create channel
  const handleCreateChannel = async (mutationData: {
    name: string;
    description: string;
    createdBy: string;
  }) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/v1/channel`,
      mutationData,

      {
        headers: {
          Authorization: `Bearer ` + user?.token,
          "Content-Type": "application/json",
        },
      }
    );
    if (data?.success) {
      toast.success("Channel Created Successfully", {
        style: {
          borderRadius: "6px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    return data;
  };

  // Query to get channels
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["channel", debounced],
    queryFn: () => fetchChannels(debounced),
    refetchOnWindowFocus: false,
  });

  // Mutation to create channel
  const channelMutation = useMutation({
    mutationFn: handleCreateChannel,
    onSuccess: () => queryClient.invalidateQueries(["channel"]),
  });

  // Function to create channel
  const handleJoinChannel = async (id: string) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_BACKEND}/api/v1/channel/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ` + user?.token,
        },
      }
    );
    if (data?.success) {
      toast.success("Joined channel", {
        style: {
          borderRadius: "6px",
          background: "#333",
          color: "#fff",
        },
      });
    }
    return data;
  };

  // Mutation to join channel
  const joinChannel = useMutation({
    mutationFn: handleJoinChannel,
    onSuccess: () => queryClient.invalidateQueries(["channel"]),
  });

  // loading state
  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 w-full mt-5">
            <Skeleton
              circle={true}
              height={45}
              width={45}
              highlightColor="#696969"
              baseColor="#3C393F"
            />
            <Skeleton
              height={45}
              width={220}
              highlightColor=" 
#696969  "
              baseColor="#3C393F"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-4  cursor-pointer">
      {data.map((channel: Channel) => (
        <div
          key={channel._id}
          className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-[#3C393F]"
        >
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img
                  src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${channel.name}`}
                />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-white font-semibold">{channel.name}</h1>
              <p className="text-gray-400 text-sm">Last message</p>
            </div>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center">
            <div className="ml-3">
              {channel.users.filter(
                (channelUser) => channelUser._id === user?.user
              ).length === 0 && (
                <label
                  htmlFor="my-modal-4"
                  className="text-white text-sm bg-gray-600 rounded-lg"
                  onClick={() => setChannelId(channel._id)}
                >
                  <p className="bg-[#252329] rounded-lg cursor-pointer">
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
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </p>
                </label>
              )}
            </div>
          </div>
        </div>
      ))}

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative  bg-[#120F13]" htmlFor="">
          <h3 className="text-lg font-bold">
            Are you sure you want to join this channel?
          </h3>
          <div className="flex w-full gap-4 justify-end mt-7">
            <label htmlFor="my-modal-4" className="btn">
              Cancel
            </label>
            <label
              htmlFor="my-modal-4"
              className="bg-[#2F80ED] btn text-white rounded-md  cursor-pointer hover:bg-blue-600 transition"
              onClick={() => joinChannel.mutate(channelId)}
            >
              Yes
            </label>
          </div>
        </label>
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[#120F13]">
          <label
            htmlFor="my-modal-6"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="font-semibold text-lg mb-2 text-center">
            Create Channel
          </div>

          <div className="space-y-2">
            <div>
              <input
                type="text"
                value={channelName}
                placeholder="Channel Name"
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full bg-[#3C393F] rounded-md px-3 py-2 mt-2"
              />
            </div>
            <div>
              <textarea
                value={channelDescription}
                placeholder="Channel Description"
                rows={5}
                className="w-full bg-[#3C393F] rounded-md px-3 py-2 mt-2 resize-none"
                onChange={(e) => setChannelDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-action">
            {channelName && channelDescription ? (
              <label
                htmlFor="my-modal-6"
                onClick={() =>
                  channelMutation.mutate({
                    name: channelName,
                    description: channelDescription,
                    createdBy: user?._id,
                  })
                }
                className="bg-[#2F80ED] text-white rounded-md px-3 py-2 cursor-pointer hover:bg-blue-600 transition"
              >
                Save
              </label>
            ) : (
              <label className="bg-gray-400 text-white rounded-md px-3 py-2   transition cursor-not-allowed">
                Save
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
