import React, { useContext } from 'react'
import { MessagesContext } from '../context/messagesContext';

type Props = {}

const Navbar = (props: Props) => {
  const messageContext = useContext<MessageContext | null>(MessagesContext);
  console.log(messageContext?.channelId, "channel id")
  console.log(messageContext?.messages?.channel?._id)
  return (
    <div className='h-[56px] w-full bg-[#252329] drop-shadow-lg px-10  sticky top-0 flex items-center gap-5'>
      <img src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=HyperText`} className='h-9 w-9'/>
  <p className='font-bold text-lg text-white'>{messageContext?.channelId===messageContext?.messages?.channel?._id ? messageContext?.messages?.channel?.name : "Select a channel"}</p>
    </div>
  )
}

export default Navbar