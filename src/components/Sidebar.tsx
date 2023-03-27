import React from "react";
import AddChannel from "./AddChannel";
import Members from "./Members";
import AboutMe from "./AboutMe";
import ManageChatMembers from "./ManageChatMembers";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="flex-[0.15] flex justify-between min-h-screen flex-col  px-2 items-center bg-[#120F13] text-white">
      <AddChannel />

      <ManageChatMembers />
      <AboutMe/>
    </div>
  );
};

export default Sidebar;
