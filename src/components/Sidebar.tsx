import AboutMe from "./AboutMe";
import AddChannel from "./AddChannel";
import ManageChatMembers from "./ManageChatMembers";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="xl:min-w-[22%] md:min-w-[22%] flex w-0 justify-between h-screen shadow-xl  flex-col  items-center overflow-x-hidden bg-[#120F13] text-white">
      <AddChannel />

      <ManageChatMembers />
      <AboutMe/>
    </div>
  );
};

export default Sidebar;
