import React from 'react'
import Messages from './Messages'

type Props = {}

const MessagesContainer = (props: Props) => {
  return (
    <div className='flex-1'>
      <Messages/>
    </div>
  )
}

export default MessagesContainer