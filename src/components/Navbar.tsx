import { useContext } from 'react';
import { MessagesContext } from '../context/messagesContext';

type Props = {}

const Navbar = (props: Props) => {
  const messageContext = useContext<MessageContext | null>(MessagesContext);

  return (
    <div className='h-[58px] w-full bg-[#252329] drop-shadow-lg px-10  sticky top-0 flex items-center gap-5'>
    {messageContext?.messages?.channel?.name &&  <img src={`https://ui-avatars.com/api/?background=random&size=128&rounded=true&format=png&name=${messageContext?.messages?.channel?.name}`} className='h-9 w-9'/>}
  <p className='font-bold text-lg text-white'>{messageContext?.messages?.channel?.name ? messageContext?.messages?.channel?.name : "Select or join a channel to chat!" }</p>
    </div>
  )
}

export default Navbar