import React, {useState} from 'react'

import { BsSendFill } from "react-icons/bs";
 import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
 import useSendMessage from '../../hook/useSendMessage.js';


 const chatInput = () => {

        const [message, setMessages] = useState("");
     const {loading, SendMessages} = useSendMessage();

     
     const handlesubmit = async(e) => {
         e.preventDefault();
         if(!message.trim())return;

         await SendMessages(message);
         setMessages("")

     }
    
   return (
    //  <div className='footer-icon'>
    <div style={{display: 'flex', bottom: '0', position: 'fixed', width: '100%', alignItems: 'center',
    justifyContent: 'center', padding: '10px'}}>
      <div style={{display: 'flex', width: '90%', background: '#375487',  padding: '10px', borderRadius: '20px'}}>
   <div><FileCopyRoundedIcon /></div>
   <div>
     <form action="" onSubmit={handlesubmit} style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
       <textarea 
         name="" 
         id="" 
         cols="30" 
         placeholder='start typing'
         style={{paddingLeft: '10px', background: 'transparent'}}
         className='text-white'
         rows="1" 
         value={message}
         onChange={(e) => setMessages(e.target.value)}
       ></textarea>
        <button type='submit'> 
      { loading ? <span className='loading loading-spinner'></span> : <BsSendFill /> } 
   </button>
     </form>
   </div> 
   </div>
 </div> 
   )
 }

export default chatInput
