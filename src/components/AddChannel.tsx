import { Toaster } from "react-hot-toast";

const AddChannel = () => {
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

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddChannel;
