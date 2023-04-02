import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const AboutMe = (props: Props) => {
  const user = JSON.parse(localStorage.getItem("token") as string);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };
  return (
    <div className="md:py-1 z-50  flex justify-around items-center bg-[#0B090C] w-full">
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
          <span>RA</span>
        </div>
      </div>
      <div>
        <p className="text-white">Riyan Ahmed</p>
      </div>

      <div className="dropdown dropdown-top dropdown-end ">
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
          className="dropdown-content menu   p-2 shadow bg-[#3C393F] rounded-md w-52"
        >
          <li>
            <Link to={`/user/${user?.user}`}>
              <a>Profile</a>
            </Link>
          </li>

          <li onClick={handleLogout}>
            <a className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AboutMe;
