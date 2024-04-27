import React, { useEffect } from 'react';
import { useSocketContext } from '../context/socketContext';
import Conversation from '../pages/zustand/zustand';
import message from '../pages/chatRoom/message';
import messageZustand from '../pages/zustand/messageZustand';

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const {  messages, setMessages, selectedUser } = Conversation();
  //const { messages, setMessages } = messageZustand();

  // useEffect(() => {
  //   if (socket) {
  //     const handleNewMessage = (newMessage) => {
  //       console.log("received new message : ", newMessage);
  //       // setMessages(prevMessages => [...prevMessages, newMessage]);
  //       setMessages([... messages, newMessage])
  //     };

  //     socket.on("newMessage", handleNewMessage);

  //     // Cleanup function
  //     return () => {
  //       // Remove event listener
  //       socket.off("newMessage", handleNewMessage);
  //       console.log("shut down");
  //     };
  //   }
  // }, [socket, setMessages]);
  useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			// newMessage.shouldShake = true;
			// const sound = new Audio(notificationSound);
			// sound.play();
			setMessages([...messages, newMessage]);
      console.log("newMessage :", newMessage)
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages, selectedUser?._id]);
}

export default useListenMessage;