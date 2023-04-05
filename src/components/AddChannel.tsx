import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { GlobalContext } from "../context/globalContext";

const AddChannel = () => {
  const globalContext = useContext<GlobalContext | null>(GlobalContext);
  const closeNav=()=>{
    globalContext?.navRef?.current?.classList.remove("min-w-[100%]");
  }
  return (
    <div className="flex justify-between items-center w-full shadow-lg sticky  top-0 bg-[#120F13] z-10 h-[56px] px-5 py-3">
      <div>
        <h1 className="text-lg font-bold">Channels</h1>
      </div>
      <div className="flex gap-3 items-center">
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
<div className="md:hidden text-red-500" onClick={closeNav}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

</div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AddChannel;
