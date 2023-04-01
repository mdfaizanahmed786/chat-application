import {  useState } from "react";
import Channels from "./Channels";
import {  useDebouncedValue } from "@mantine/hooks";

type Props = {};

const ManageChatMembers = (props: Props) => {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 500);

  return (
    <div className="flex-1 py-7 overflow-y-auto h-full px-3">
      <div className="flex  items-center py-3 rounded-md bg-[#3C393F]">
        <div className="px-3">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className="outline-none  border-none flex-1 px-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <Channels debounced={debounced}/>
    </div>
  );
};

export default ManageChatMembers;
