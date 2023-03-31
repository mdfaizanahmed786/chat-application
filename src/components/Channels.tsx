import React  from "react";

type Props = {};

const Channels = ({channels}) => {

  return (
    <div className="py-4 cursor-pointer  ">
      {channels.map((channel) => (
        <div
          key={channel._id}
          className="flex items-center py-2 px-3 mb-2 rounded-md hover:bg-[#3C393F]"
        >
          <div className="flex items-center">
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src="https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=amazing" />
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
