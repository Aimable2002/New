import React, { useState } from 'react'
import Conversation from '../pages/zustand/zustand'
import axios from 'axios';

const useSendMessage = () => {
  const {selectedUser, messages, setMessages} = Conversation();
  
  const [loading, setLoading] = useState(false)

  const SendMessages = async(message) => {
    setLoading(true)
    try{
      const token = localStorage.getItem('online-user');

      const res = await axios.post(`https://chatapp-na06.onrender.com/api/message/send/${selectedUser._id}`,{message}, {
        headers: {
          Authorization: ` ${JSON.parse(token).token}`
        },
      })

      const data = res.data;

      if(data.error){
        throw new Error ("fail to send message on server", error)
      }
      setMessages([...messages, data]);
      console.log('message sent', data)

    }catch(error){
      console.error('error in send message', error)
    }finally{
      setLoading(false)
    }
  }
  return {loading, SendMessages}
}

export default useSendMessage