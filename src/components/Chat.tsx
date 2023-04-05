import React from "react";
import Navbar from "./Navbar";
import MessagesContainer from "./MessagesContainer";
import InputContainer from "./InputContainer";

type Props = {};

const Chat = (props: Props) => {
  return (
    <div className="min-w-[78%] bg-[#252329]  flex flex-col h-screen ">
      <Navbar />

      <MessagesContainer />
      <InputContainer />
    </div>
  );
};

export default Chat;
