import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

type Props = {};

const AddChannel = (props: Props) => {
  const [channelName, setChannelName] = useState<string>("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const handleCreateChannel = async () => {
    try {
    const notification=toast.loading("Creating Channel...", {
        style: {
          borderRadius: "6px",
          background: "#333",
          color: "#fff",
        },
      });
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/v1/channel`,
        {
          name: channelName,
          description: channelDescription,
          createdBy: "6425be332b007edd139c253e"
        },
        {
          headers: {
            Authorization: `Bearer ` + import.meta.env.VITE_AUTHORIZATION,
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.success) {
        toast.success("Channel Created Successfully", {
          id: notification,
          style: {
            borderRadius: "6px",
            background: "#333",
            color: "#fff",
          },
        });
        setChannelName("");
        setChannelDescription("");
      }
    } catch (err:any) {
      toast.error(JSON.stringify(err?.message), {
        style: {
          borderRadius: "6px",
          background: "#333",
          color: "#fff",
        },
        
      })
    }
  };

  return (
    <div className="flex justify-between items-center w-full shadow-lg sticky top-0 bg-[#120F13] z-10 h-[56px] px-2">
      <div>
        <h1 className="text-lg font-bold">Channels</h1>
      </div>
      <label htmlFor="my-modal-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-[#2D9CDB] cursor-pointer hover:text-white transition"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </label>

      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-[#120F13]">
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
                onClick={handleCreateChannel}
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
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddChannel;
