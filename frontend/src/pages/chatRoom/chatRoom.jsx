import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcCallRoundedIcon from '@mui/icons-material/AddIcCallRounded';
import DuoRoundedIcon from '@mui/icons-material/DuoRounded';
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import './chatRoom.css';
import { Link, useNavigate } from 'react-router-dom';
import Conversation from '../zustand/zustand.jsx';

import ChatInput from './chatInput.jsx';
import { useSocketContext } from '../../context/socketContext.jsx';
import Messages from './messages.jsx';

const chatRoom = () => {
  //const [text, setText] = useState();
  const [isCall, setIsCall] = useState(false);
  const {selectedUser, setUser, setMessages} = Conversation();
//const selectedUser = localStorage.getItem('selectedUser')
  console.log('selectedUser :', selectedUser)
  // const handleText = () => {
  //   setText(!text)
  // }
  const handleCall = () => {
    setIsCall(!isCall)
  }
  // const { sendMessage, loading } = useSendMessage();
  // const [messages, setMessages] = useState('');

  // const handleMsgSubmit = async (e) => {
  //   e.preventDefault();
  //   if(!messages.trim())return;
  //   await sendMessage(messages);
  //   setMessages('')
  // }
  const navigate = useNavigate();
  const resetBack = () => {
    localStorage.removeItem('selectedUser')
    setUser(null);
    navigate('/')
    
  }

 
  const {onlineUser} = useSocketContext();
  const isOnline = onlineUser.includes(selectedUser?._id)


  return (
    <div className='parent'>
        <div className='chat-content' style={{zIndex: '1'}}>
            <div className='header'>
                <div className='head-content'>
                    <div className='selected-pc'>
                      <div onClick={resetBack}><KeyboardDoubleArrowLeftRoundedIcon /></div>
                      <div className='s-pc'>
                      <Avatar 
                      alt="Remy Sharp" 
                      src={selectedUser.avatar} sx={{ width: 46, height: 46 }} />
                      </div>
                      <div className='s-detail'>
                        <div className='s-name'>{selectedUser.userName}</div>
                        {isOnline ? (
                          <div className='s-statue' style={{fontSize: '12px'}}>online</div>
                        ) : (
                          <div className='s-statue' style={{fontSize: '12px'}}>offline</div>
                        )}
                      </div>
                    </div>
                    <div className='drop-call'>
                      <div onClick={handleCall}>{isCall ? <CloseRoundedIcon /> : <PhoneEnabledRoundedIcon />}</div>
                        {isCall && (
                        <div className='drop-call-content-left'>
                          <AddIcCallRoundedIcon />
                          <DuoRoundedIcon />
                        </div>
                        )}
                    </div>

                </div>
              </div>


              

          </div>

          <Messages />
          <ChatInput />
    </div>
  )
}

export default chatRoom