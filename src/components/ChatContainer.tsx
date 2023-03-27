import React from 'react'
import Navbar from './Navbar'
import MessagesContainer from './MessagesContainer'
import InputContainer from './InputContainer'

type Props = {}

const ChatContainer = (props: Props) => {
  return (
    <div className=' overflow-auto flex flex-1  py-6 flex-col  text-white bg-[#252329]'>
     
        <MessagesContainer/>
        <InputContainer/>

    </div>
  )
}

export default ChatContainer