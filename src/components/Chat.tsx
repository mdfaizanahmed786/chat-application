import React from "react";
import Navbar from "./Navbar";
import MessagesContainer from "./MessagesContainer";
import InputContainer from "./InputContainer";

type Props = {};

const Chat = (props: Props) => {
  return (
    <div className="md:min-w-[78%] xl:min-w-[78%] min-w-[100%] bg-[#252329]  flex flex-col h-screen ">
      <Navbar />

      <MessagesContainer />
      <InputContainer />
    </div>
  );
};

export default Chat;
