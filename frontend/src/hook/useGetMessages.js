import React, { useEffect, useState } from 'react'
import Conversation from '../pages/zustand/zustand';
import axios from 'axios';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  //const [messages] = useState([]);
const {selectedUser, setMessages, messages} = Conversation();

  useEffect(() => {
    const getMessages = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('online-user')
            const res = await axios.get(`http://localhost:8000/api/message/${selectedUser._id}`,{
                headers: {
                    Authorization: ` ${JSON.parse(token).token}`
                }
            })
            //console.log('selectedUser :', selectedUser)
            const data = res.data;
            console.log("data in client :", data)

            if(data.error){
                throw new Error("error get message", error)
            }
            setMessages(data)
        }catch(error){
            console.log('error in client side', error)
        }finally{
            setLoading(false)
        }

    }
    console.log('selectedUsser available :', selectedUser)
    if(selectedUser._id) getMessages();
  }, [selectedUser._id, setMessages])
  return {loading, messages}
}

export default useGetMessages;