import { useContext } from "react";
import AboutMe from "./AboutMe";
import AddChannel from "./AddChannel";
import ManageChatMembers from "./SearchChannel";
import { GlobalContext } from "../context/globalContext";

type Props = {};

const Sidebar = (props: Props) => {
  const globalContext = useContext(GlobalContext);
  return (
    <div className="xl:min-w-[22%] md:min-w-[22%] flex  duration-150 transition-width  justify-between h-screen shadow-xl  flex-col  items-center overflow-x-hidden bg-[#120F13] text-white" ref={globalContext?.navRef}>
      <AddChannel />

      <ManageChatMembers />
      <AboutMe/>
    </div>
  );
};

export default Sidebar;
