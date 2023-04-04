import React, { useEffect, useRef } from 'react'
import Messages from './Messages'

type Props = {}

const MessagesContainer = (props: Props) => {
  const messageEl = useRef<HTMLDivElement>(null);
 

  useEffect(() => {
    if (messageEl) {
      messageEl?.current?.addEventListener('DOMNodeInserted', (event) => {
        const target = event.currentTarget as HTMLElement;
        target.scroll({ top: target?.scrollHeight, behavior: 'smooth' });
      });

    }

    return () => {
      messageEl?.current?.removeEventListener('DOMNodeInserted', (event) => {
        const target = event.currentTarget as HTMLElement;
        target.scroll({ top: target?.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])
  return (
    <div ref={messageEl} className='flex-1 h-full overflow-y-auto  '>
      <Messages/>
    </div>
  )
}

export default MessagesContainer