import React from 'react'
import Navbar from './Navbar'
import MessagesContainer from './MessagesContainer'
import InputContainer from './InputContainer'

type Props = {}

const ChatContainer = (props: Props) => {
  return (
    <div className='flex-[0.85] min-h-screen overflow-auto flex flex-col  text-white bg-[#252329]'>
        <Navbar/>
        <MessagesContainer/>
        <InputContainer/>

    </div>
  )
}

export default ChatContainer