import React from "react";

type Props = {};

const AddChannel = (props: Props) => {
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
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="bg-[#2F80ED] text-white rounded-md px-3 py-2 cursor-pointer hover:bg-blue-600 transition"
            >
              Save
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannel;
