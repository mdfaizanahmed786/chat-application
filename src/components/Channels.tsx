import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React  from "react";

type Props = {
  debounced:string
};

const initialChannels = [
  {
    _id: "1",
    name: "Channel 1",
    description: "Channel 1 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "8",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "7",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "6",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "5",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "4",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
  {
    _id: "3",
    name: "Channel 2",
    description: "Channel 2 Description",
    createdAt: "2021-09-01T12:00:00.000Z",
    updatedAt: "2021-09-01T12:00:00.000Z",
    createdBy:'6425be332b007edd139c253e',
    users:['6425be332b007edd139c253e']
  },
]

const Channels = ({debounced}:Props) => {
  const queryClient = useQueryClient()
  
  const fetchChannels = async (search:string) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND}/api/v1/channel?cname=${search}`,
      {
        headers: {
          Authorization: `Bearer ` + import.meta.env.VITE_AUTHORIZATION,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey:['channels', debounced],
    queryFn:()=> fetchChannels(debounced),
    staleTime:30 * 1000 // 1/2 minute
  })

  if (isLoading) {
    return <div>Loading yaar..</div>
  }
  return (
    <div className="py-4  cursor-pointer">
      {initialChannels.map((channel:Channel) => (
        <div
          key={channel._id}
          className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-[#3C393F]"
        >
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${channel.name}`} />
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
              <p className="text-gray-400 text-sm">{new Date(channel.createdAt).getDate()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Channels;
