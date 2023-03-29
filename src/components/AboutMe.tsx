import React from "react";

type Props = {};

const AboutMe = (props: Props) => {
  return (
    <div className="md:py-1  flex justify-around items-center bg-[#0B090C] w-full">
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
          <span>RA</span>
        </div>
      </div>
      <div>
        <p className="text-white">Riyan Ahmed</p>
      </div>
     

      <div className="dropdown dropdown-top z-50  cursor-pointer ">
        <label tabIndex={0} className="m-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu  p-2 shadow bg-[#3C393F] rounded-md w-52"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
