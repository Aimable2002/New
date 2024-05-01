import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import useGetUsers from '../../hook/useGetUsers';
import { Link, useNavigate } from 'react-router-dom'
import './home.css';

import { MdCallMissed } from "react-icons/md";

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import PaidIcon from '@mui/icons-material/Paid';
import CallEndRoundedIcon from '@mui/icons-material/CallEndRounded';


import  HomeIcon from '@mui/icons-material/Home';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcCallRoundedIcon from '@mui/icons-material/AddIcCallRounded';
import DuoRoundedIcon from '@mui/icons-material/DuoRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import Conversation from '../zustand/zustand.jsx';
import { useSocketContext } from '../../context/socketContext.jsx';

import { FaBusinessTime } from "react-icons/fa6";
import { RiVipCrownFill } from "react-icons/ri";
import { RxFontStyle } from "react-icons/rx";
import { BsBagHeartFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import useLogout from '../../hook/useLogout.js';
import useGetLoggedUser from '../../hook/useGetLoggedUser.js';
import useListenMessages from '../../hook/useListenMessage.js'
import LargeScreen from './largeHome.jsx'
import '../post/post.css'
//import useGetMessages from '../../hook/useGetMessages.js';

const truncateString = (str, maxLength) => {
  if(str.length <= maxLength ){
    return str;
  }else{
    const truncatedString = str.slice(0, maxLength);
    return truncatedString + (truncatedString.endsWith('') ? '' : '...');
  }
}

const Home = ({user}) => {
  const {loading, users} = useGetUsers(false)
  //const {setUser} = Conversation();
//const {messages} = useGetMessages();
  const [isClicked, setIsClicked] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isCall, setIsCall] = useState(false);
  const [showExplore, setShowExplore] = useState(false);

  //const [messages, setMessages] = useState();
  const [unread, setUnRead] = useState();
  const {logout} = useLogout();

  const {loggedUser} = useGetLoggedUser();
console.log("user on home :", loggedUser)
  const handleExplore = () => {
    setShowExplore(!showExplore)
  }
  const handleBack = () => {
    setShowExplore(!showExplore)
  }

  const handleMenu = () => {
    setIsClicked(!isClicked)
  }
  const handleCall = () => {
    setIsCall(!isCall)
  }

  //const handleTheme = () => {
   // setIsDark(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  //}
const [follower, setFollower] = useState(false);

  const handleFollower = () => {
    setFollower(count => count + 1)
  }

  const navigate = useNavigate();
  
  const [isSelected, setIsSelected] = useState(false)
  const {selectedUser, setUser, setMessages} = Conversation();
  console.log('selected user :', selectedUser)
    const handleSelectedUser = (user) => {
      setUser(user)
      navigate(`/chat/${user._id}`)
    }
  const {onlineUser} = useSocketContext();
  const userWithOnlineStatus = users.map(user => ({
    ...user,
    isOnline: onlineUser.includes(user._id)
}))

const [search, setSearch] = useState('');

const handleSearch = (e) => {
  e.preventDefault();
  if(!search)return;
  if(search.length < 3){
    return console.error('use atleast 3 char')
    
  }
    const result = users.find((any) => any.userName.toLowerCase().includes(search.toLowerCase()))
  
  if(result){
    setUser(result)
    setSearch('')
  }else{
    return console.log('no result found')
  }

}

const [isLarge, setIsLarge] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsLarge(window.innerWidth >= 1024)
  }

  window.addEventListener('resize', handleResize);

  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize)
  }
},[])

 return (
   < div className='parent'>
    {!isLarge ? (
   <div className={`home-content ${!isDark}`}>
   {showExplore ? (
         <>
         <div className='header-only'>
           <div className='head-content-only'>
             <div onClick={handleBack}><KeyboardDoubleArrowLeftRoundedIcon /></div>
           </div>
         </div>
         {users.map((user, index) => (
         <div key={index} className='user-list'>
          <div style={{padding: '10px'}}>
            <div className='user-div'>
              <div className='user-pc'>

                {/* <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user.avatar} />
                  </div>
         </div> */}
           <Avatar className='avatar'
                     alt="Remy Sharp" 
                     src={user.avatar} sx={{ width: 46, height: 46 }} />
           </div>
           <div className='user-detail'>
             <div className='user-name'>
               <div className='name'>{user.userName}</div>
               <div className='call'>
                 <div className='count-follower'>
                   <div className='count'>{follower}</div>
                 </div>
                 <button onClick={handleFollower} style={{color: '#33FFBE'}}>Follow</button>
               </div>
             </div>
             <div className='user-msg'>
               <div className='msg'>interested in...</div>
               <div className='time'>6 min ago</div>
             </div>
           </div>
         </div>
         </div> 
       </div>
       ))}
       <div style={{paddingBottom: '100px'}}></div>
       </>

     )
   : (

     <>

      <div className='header' style={{zIndex: '1'}}>
        <div className='head-content'>
          {loggedUser.map((log) => ( <div style={{color: '#09B391'}}> Welcome {log.userName}</div>))}
          <div className='drop-call'>
           <div onClick={handleCall}>{isCall ? <CloseRoundedIcon /> : <CallEndRoundedIcon />}</div>
           {isCall && (
             <div className='drop-call-content'>
             <AddIcCallRoundedIcon />
             <DuoRoundedIcon />
             </div>
           )}
          </div>
          <div style={{display: 'flex', flexDirection: 'row'}}>
           <div><CameraAltRoundedIcon /></div>
           <div><PaidIcon /></div>
           <div className='drop-menu'>
             <div onClick={handleMenu}>{isClicked ? <CloseRoundedIcon /> : <MenuRoundedIcon />}</div>
             {isClicked && (
               <div className='drop-content'>
                 {loggedUser.map((log, idx) => (
               <div className='menu-profile' style={{marginTop: '30px'}} >
                 <div className='menu-pc'>
                    
                 {/* <div className="avatar">
                   <div className="w-14 rounded-full">
                     <img src={log.avatar} />
                   </div>
                 </div> */}

                   <Avatar
                   alt='user-pc'
                   src={log.avatar}
                   sx={{width: 56, height: 56}} />
                 </div>
                 <div className='menu-username' style={{fontWeight: '100'}}>{log.userName}</div>
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

               {/* <div className='dark-mode'>
                 <div className='dark' onClick={handleTheme}>Theme</div>
               </div>
               <Link to=''>content 5</Link> */}
             </div>
             )}
           </div>
          </div>
        </div>
        <div style={{position: 'relative', zIndex: '-1', marginTop: '4vh', fontSize: '20px'}}>ChatApp</div>
      </div>
       
          

      
      <div className='search-div' onSubmit={handleSearch}  style={{display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '-1'}}>
       {/* <form action="" > */}
        <input 
        type="search" 
        placeholder='Type to search'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
        {/* <button type='submit'>search</button> */}
        {/* </form> */}
      </div>
       
      <div className='story-area' style={{zIndex: '-1'}}>
       <div className='story-flow'>
         {users.map((user, idx) => (
           <div key={idx} className='story-here ' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
           {/* <div className="avatar px-2">
             <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
               <img src={user.avatar} />
             </div>
           </div> */}
           <Avatar
                   alt='user-pc'
                   src={user.avatar}
                   sx={{width: 56, height: 56}} />
         <div className='story-owner'>{truncateString(user.userName, 5)}</div>
           </div>
         ))}
          
       </div>
      </div>  
       
      <div className='explore'>
       
        
       <Link>VIP member</Link>
       <div style={{display: 'flex', alignItems: 'center', color: '#09B391'}} onClick={handleExplore}>Explore</div>
      </div>
       {userWithOnlineStatus
       .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
       .map((user, index) => (
      <div className='user-list' key={index} style={{zIndex: '-1'}}>
       <div style={{padding: '10px'}}>
       <div className='user-div'>
          
         <div className='user-pc'>

          {/* <div className={`avatar ${user.isOnline ? 'online' : 'offline'}`}>
           <div className="w-12 rounded-full">
             <img src={user.avatar} />
           </div>
           </div> */}

              <Avatar
              className={`avatar ${user.isOnline ? 'online' : 'offline'}`}
                   alt='user-pc'
                   src={log.avatar}
                   sx={{width: 56, height: 56}} />
           
         </div>
         {/* {messages.map((message, idx) => ( */}
         <div className='user-detail' onClick={() => handleSelectedUser(user)}>
           <div className='user-name'>
             <div className='name'>{user.userName}</div>
             <div className='call'><MdCallMissed />   <div className="badge badge-primary">+1</div></div>
           </div>
           {/* {messages.map((message) => ( */}
           <div className='user-msg flex justify-between'>
             <div className='msg' ></div>
              
             <div className='time'>6 min ago</div>
           </div>
         </div>
       </div>
      
       </div>
     </div>
     ))}
     <div style={{paddingBottom: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>invite friends</div>
     </>
     )}
     <div className='footer-icon' style={{zIndex: '2'}}>
       <Link to='/post'><div><HomeIcon /></div></Link>
       <div><DonutLargeIcon /></div>
       <div></div>
       <div className='up-icon'><AddCircleOutlineRoundedIcon /></div>
       <div><ForumRoundedIcon /></div>
       <Link to='/account'><div><AccountCircleIcon /></div></Link>
     </div>

   </div>

) : (

  <LargeScreen />

  )}

   </div>
 )
}

export default Home
























