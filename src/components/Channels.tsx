import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  debounced: string;
};

const initialChannels = [
  {
    _id: "1",
    name: "Channel 1",
    description: "Channel 1 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "8",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "7",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "6",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "5",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "4",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy: "6425be332b007edd139c253e",
    users: ["6425be332b007edd139c253e"],
  },
];

const Channels = ({ debounced }: Props) => {
  const queryClient = useQueryClient();
  const [channelName, setChannelName] = useState<string>("");
  const [channelId, setChannelId]=useState('')
  const [channelDescription, setChannelDescription] = useState<string>("");
  const user=JSON.parse(localStorage.getItem("token") as string)

  const fetchChannels = async (search: string) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/v1/channel?cname=${search}`,
      {
        headers: {
          Authorization:
            `Bearer ` +
            user?.token,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };
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
          Authorization:
            `Bearer ` +
            user?.token,
          "Content-Type": "application/json",
        },
      }
    );
    if(data?.success){

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
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["channel", debounced],
    queryFn: () => fetchChannels(debounced),
  });

  const mutation = useMutation({
    mutationFn: handleCreateChannel,
    onSuccess: () => queryClient.invalidateQueries(["channel"]),
  });

 

  

  const handleJoinChannel=async(id:string)=>{
   const {data}=await axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/channel/${id}`, {}, {
    headers:{
      Authorization:`Bearer `+user?.token
    }
   })
  if(data?.success){
    toast.success('Joined channel', {
      style: {
        borderRadius: "6px",
        background: "#333",
        color: "#fff",
      },
    })
  }
   return data;
  }

const channelMutate=useMutation({
  mutationFn:handleJoinChannel,
  onSuccess:()=>queryClient.invalidateQueries(['channel'])

})

  if (isLoading) {
    return <div>Loading yaar..</div>;
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
            {channel.users.filter(channelUser=>channelUser._id===user?.user).length===0 && <label
                htmlFor="my-modal-4"
                className="text-white text-sm bg-gray-600 rounded-lg"
                onClick={()=>setChannelId(channel._id)}

                
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
}
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
          <label
            htmlFor="my-modal-4"
            className="btn"
          >
           Cancel
          </label>
          <label
            htmlFor="my-modal-4"
            className="bg-[#2F80ED] btn text-white rounded-md  cursor-pointer hover:bg-blue-600 transition"
            onClick={()=>channelMutate.mutate(channelId)}
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
                  mutation.mutate({
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
