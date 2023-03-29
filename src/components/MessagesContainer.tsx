import React from 'react'
import Messages from './Messages'

type Props = {}

const MessagesContainer = (props: Props) => {
  return (
    <div className='flex-1 h-full overflow-y-auto  '>
      <Messages/>
    </div>
  )
}

export default MessagesContainer