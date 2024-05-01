import React from 'react'
import Message from './message.jsx';
//import useGetMessages from '../../hook/useGetMessages.js';
import useListenMessage from '../../hook/useListenMessage.js';
const Messages = () => {
  useListenMessage();

  
  
  return (
    <div>
        <Message />
    </div>
  )
}

export default Messages