import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import  HomeIcon from '@mui/icons-material/Home';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import axios from 'axios';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications'; 
import '../home/home.css'
import './post.css'
import Notifications from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import useLoggedUser from '../../hook/useGetLoggedUser';


import { FaBusinessTime } from "react-icons/fa6";
import { RiVipCrownFill } from "react-icons/ri";
import { RxFontStyle } from "react-icons/rx";
import { BsBagHeartFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import useLogout from '../../hook/useLogout.js';
import useGetUsers from '../../hook/useGetUsers.js';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";

import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ShareIcon from '@mui/icons-material/Share';
import ForumIcon from '@mui/icons-material/Forum';
import Conversation from '../zustand/zustand.jsx';

import SendIcon from '@mui/icons-material/Send';
import message from '../chatRoom/message.jsx';
import useSendMessage from '../../hook/useSendMessage.js';
import { Avatar } from '@mui/material';
import { Button } from '@nextui-org/react';


const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  } else {
    const truncatedString = str.slice(0, maxLength);
    return truncatedString + (truncatedString.endsWith(' ') ? '' : '...'); // Add ellipsis if the last character is not a space
  }
}

const post = () => {
const [menu, setMenu] = useState(false);
const {loggedUser} = useLoggedUser();
const {loading, logout} = useLogout();
const {users} = useGetUsers();
const [isClicked, setIsClicked] = useState(false);
const handleClick = () => {
  setIsClicked(!isClicked)
}
const [isClicked1, setIsClicked1] = useState(false);
const handleClick1 = () => {
  setIsClicked1(!isClicked1)
}
const [isClicked2, setIsClicked2] = useState(false);
const handleClick2 = () => {
  setIsClicked2(!isClicked2)
}
const [isClicked3, setIsClicked3] = useState(false);
const handleClick3 = () => {
  setIsClicked3(!isClicked)
}
const [isClicked4, setIsClicked4] = useState(false);
const handleClick4 = () => {
  setIsClicked4(!isClicked)
}
const {selectedUser, setUser} = Conversation();

const handleMenu = (e) => {
  e.preventDefault();
  setMenu(!menu)
}
const [message, setMessages] = useState();
const { SendMessages} = useSendMessage();
const handleSendClick  = (user) => {
  setUser(user);
  document.getElementById('my_modal_1').showModal()
}
const handleSend = async(user) => {
  
  if(!message.trim())return
  console.log('message :', message)
  await SendMessages(message);
  setMessages('')

  document.getElementById('my_modal_1').close();
}



// console.log('selected :', selectedUser)
// const navigate = useNavigate();
// const handleSelectedUser = (user) => {
//   setUser(user._id)
//   navigate(`/chat/${user._id}`)
  
// }

  return (
    <div className='parent overflow-auto'>

      <div className='header-p'>
        <div className='head-content'>
          <div>ChatApp</div>
          <div className='flex flex-row align-middle gap-4'>
            <div><SearchIcon /></div>
            <div>
              <Notifications />
            </div>
            <div className='drop-menu'>
              <div onClick={handleMenu}>{!menu ? (<MenuIcon />) : (<CancelIcon />)}</div>
              {menu && (
              <div className='drop-content'>
                {loggedUser.map((user) => (
                  <div className='menu-profile' style={{marginTop: '30px'}} >
                    <div className='menu-pc'>
                      <div className="avatar">
                        <div className="w-24 rounded-full">
                          <img src={user.avatar} />
                        </div>
                      </div>
                    </div>
                    <div className='menu-username' style={{fontWeight: '100'}}>{user.userName}</div>
                  </div>
                ))}


                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                 <div style={{paddingLeft: '5px'}}><FaBusinessTime /></div>
                 <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                   <div>Business Account</div>
                   <div style={{paddingRight: '35px'}}><FaRegArrowAltCircleRight /></div>
                 </div>
               </div>


               <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                 <div style={{paddingLeft: '5px'}}><RiVipCrownFill /></div>
                 <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                   <div>Pro Account</div>
                   <div style={{paddingRight: '35px'}}><FaRegArrowAltCircleRight /></div>
                 </div>
               </div>

               <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                 <div style={{paddingLeft: '5px'}}><RxFontStyle /></div>
                 <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                   <div>Style</div>
                   <div style={{paddingRight: '35px'}}><FaRegArrowAltCircleRight /></div>
                 </div>
               </div>

               <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                 <div style={{paddingLeft: '5px'}}><BsBagHeartFill /></div>
                 <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                   <div>Tell Friend</div>
                   <div style={{paddingRight: '35px'}}><FaRegArrowAltCircleRight /></div>
                 </div>
               </div>

               <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                 <div style={{paddingLeft: '5px'}}><MdDeleteForever /></div>
                 <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                   <div style={{color: 'red'}}>Delete Account</div>
                   <div style={{paddingRight: '35px'}}></div>
                 </div>
               </div>
                
               <div  style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                 <div style={{paddingLeft: '5px'}}>{loading ? 
                 <span className='loading loading-spinner'></span> : <RiLogoutCircleLine />}</div>
                 <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                   <div style={{color: 'red'}} onClick={logout}>Logout</div>
                   <div style={{paddingRight: '35px'}}></div>
                 </div>
               </div>


              </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='stry py-2'>
        {loggedUser.map((user) => (
        <div className='ownr flex align-middle flex-col'>

          {/* <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={user.avatar} />
            </div>
          </div> */}
          <Avatar
            alt='user-pc'
            src={user.avatar}
            sx={{width: 56, height: 56}} />
          <div className='flex align-middle justify-center'>Add</div>
        </div>
        ))}
        {users.map((user, idx) => (
        <div key={idx} className='others flex align-middle flex-col'>

          
            {/* <div className="avatar px-1">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.avatar} />
              </div>
            </div> */}
            <Avatar
            alt='user-pc'
            src={user.avatar}
            sx={{width: 56, height: 56}} />

            <div className='flex align-middle justify-center'>{truncateString(user.userName, 5)}</div>
          

        </div>
        ))}
        <div className='divider divide-x-4'></div>
      </div>

      <div style={{zIndex: '-1', marginLeft: '4px', fontFamily: 'sans-selif', fontWeight: '500', fontSize: '20px'}}>categories</div>

      <div className='flex flex-row gap-1 overflow-x-auto mt-1' style={{
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'auto',
        marginTop: '4px'
      }}>

        <div onClick={handleClick}><Button className={isClicked ? `my-btn` : 'my-btn-not'}>Popular</Button></div>
        <div onClick={handleClick1}><Button className={isClicked1 ? `my-btn` : 'my-btn-not'}>Trend</Button></div>
        <div onClick={handleClick2}><Button className={isClicked2 ? `my-btn` : 'my-btn-not'}>Hottie</Button></div>
        <div onClick={handleClick3}><Button className={isClicked3 ? `my-btn` : 'my-btn-not'}>Available</Button></div>
        <div onClick={handleClick4}><Button className={isClicked4 ? `my-btn` : 'my-btn-not'}>Event</Button></div>

      </div>

      <div className='poster'>
        {users.map((user) => (
        <div className='crd flex flex-col align-middle' style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div className='crd-d flex flex-row align-middle justify-between py-2' style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px',
            paddingBottom: '8px',
            width: '100%'
          }}>
            <div className='crd-pc flex flex-row align-middle gap-3' style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={user.avatar} />
                </div>
              </div> */}
              <Avatar
            alt='user-pc'
            src={user.avatar}
            sx={{width: 56, height: 56}} />
              <div className=' self-center'>{user.userName}</div>
            </div>
            <div className='self-center flex flex-row' style={{
              display: 'flex',
              alignSelf: 'center',
              flexDirection: 'row'
            }}>
              <div><button className='my-btn2'>subscribe</button></div>
              <div><MoreVertIcon /></div>
            </div>
          </div>
          <div className='pc' style={{width: '100%'}}>
            <div style={{
              width: '100%'
            }}>
            <figure>
              <img 
              src="/image/used pc.jpg" alt="poster" />
            </figure>
            </div>
          </div>
          <div className='fotter flex flex-col align-middle' style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}>
            <div className='up flex flex-row align-middle justify-between' style={{
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}>
              <div className='lft flex flex-row align-middle gap-2' style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div><FavoriteBorderIcon /></div>
                <div><ModeCommentIcon /></div>
                <div><ShareIcon /></div>
              </div>
              <div className='rgt flex flex-row align-middle gap-2' style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div></div>
                <div onClick={() => handleSendClick(user)}><ForumIcon /></div>

                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <div className='w-full flex flex-row'>
                      <form className='flex flex-row' onSubmit={() => handleSend(user)}>
                      <textarea 
                      name="" 
                      id="" 
                      cols="30"
                      placeholder='Type Message...'
                      value={message} 
                      onChange={(e) => setMessages(e.target.value)}
                      rows="1"></textarea>
                      <button type='submit' className='flex self-end text-right'><SendIcon /></button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
            <div className='dwn'>
              <div className='rct-cmt flex justify-center'>recent comment</div>
            </div>
          </div>
          <div style={{borderBottom: '1px solid #D2D3D5'}}></div>
        </div>
        
        ))}
      </div>
      <div style={{marginBottom: '80px'}}></div>
      <div className='footer-icon1 py-2' style={{zIndex: '2'}}>
        <Link to='/post'><div><HomeIcon /></div></Link>
        <div><DonutLargeIcon /></div>
        <div className='up-icon1'><AddCircleOutlineRoundedIcon /></div>
        <Link to='/'><div><ForumRoundedIcon /></div></Link>
        <Link to='/account'><div><AccountCircleIcon /></div></Link>
      </div> 
    </div>
  )
}

export default post