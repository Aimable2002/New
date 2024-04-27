//import React, { useState } from 'react'
// import Conversation from '../zustand/zustand'
// import useGetMessages from '../../hook/useGetMessages';
// import useListenMessage from '../../hook/useListenMessage';


// const message = ({message}) => {
//   //const { selectedUser } = Conversation();
//   //const { loading, messages } = useGetMessages();
//   //console.log("get data : ", messages)
  
//   const senderIdStored = localStorage.getItem('online-user');
//   const sender = senderIdStored ? JSON.parse(senderIdStored) : null;
//   const senderId = sender ? sender._id : null;
  
//   const recieverIdStored = localStorage.getItem('selectedUser');
//   const reciever = recieverIdStored ? JSON.parse(recieverIdStored) : null;
//   const recieverId = reciever ? reciever._id : null;

//   console.log("senderId :", senderId);
//   console.log("recieverId :", recieverId);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (messages.length === 0) {
//     return <div>Start a conversation</div>;
//   }

//   return (
//     <div>
//       {messages.map((message, idx) => { 
// console.log("Message : ", message)
// console.log("reciever id : ", recieverId)
// console.log("message.sender : ", message.senderId === senderId);
//           const isFromCurrentUser = message.senderId === senderId;
//           console.log("sender id required : ", senderId)
//           console.log("message sender : ", message.senderId)
//          const avatar = isFromCurrentUser ? sender?.avatar : reciever?.avatar;


//         return (
//           <div key={idx} className={`chat ${isFromCurrentUser ? 'chat-end' : 'chat-start'}`}>
//             <div className="chat-image avatar">
//               <div className="w-10 rounded-full">
//                 <img alt="chat" src={avatar} />
//               </div>
//             </div>
//             <div className="chat-bubble">{message.message}</div>
//           </div>
//         );
//       })}
//       <div style={{marginBottom: '100px'}}></div>
//     </div>
//   );
// }

// export default message;





import React, { useState } from 'react'
import Conversation from '../zustand/zustand'
import useGetMessages from '../../hook/useGetMessages';
//import useListenMessage from '../../hook/useListenMessage';


 const message = () => {
   const { selectedUser } = Conversation();
   const { loading, messages } = useGetMessages();
   //useListenMessage();
   console.log("messages : ", messages)
 
   const senderIdStored = localStorage.getItem('online-user');
   const sender = senderIdStored ? JSON.parse(senderIdStored) : null;
   const senderId = sender ? sender._id : null;
 
   const recieverIdStored = localStorage.getItem('selectedUser');
   const reciever = recieverIdStored ? JSON.parse(recieverIdStored) : null;
   const recieverId = reciever ? reciever._id : null;

   if (loading) {
     return <div>Loading...</div>;
   }

   else if (messages.length === 0) {
     return <div>Start a conversation</div>;
   }
   else if (!messages || !Array.isArray(messages)) {
     return <div>No messages to display</div>;
 }else{
   return (
     <div>
       {messages.map((message, idx) => { 
         const senderIdStored = localStorage.getItem('online-user');
         const sender = senderIdStored ? JSON.parse(senderIdStored) : null;
          const isFromCurrentUser = message.senderId === senderId;
         const avatar = isFromCurrentUser ? sender?.avatar : reciever?.avatar;


         return (
           <div key={idx} className={`chat ${isFromCurrentUser ? 'chat-end' : 'chat-start'}`}>
             <div className="chat-image avatar">
               <div className="w-10 rounded-full">
                 <img alt="chat" src={avatar} />
               </div>
             </div>
             <div className="chat-bubble">{message.message}</div>
           </div>
       );
     })}
       <div style={{marginBottom: '100px'}}></div>
     
       </div>
   
   );
 }
 }

 export default message;