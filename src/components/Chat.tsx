import React from 'react'
import Navbar from './Navbar'
import ChatContainer from './ChatContainer'

type Props = {}

const Chat = (props: Props) => {
  return (
    <div className='flex-[0.85] flex flex-col  min-h-screen'>
           <Navbar/>
           <ChatContainer/>

    </div>
  )
}

export default Chat