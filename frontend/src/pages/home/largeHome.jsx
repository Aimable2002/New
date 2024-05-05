import React, { useState } from 'react'
import './home.css';
import { MdCallMissed } from "react-icons/md";
import Conversation from '../zustand/zustand';

import { Avatar } from '@mui/material';

import useGetUsers from '../../hook/useGetUsers';
import { useSocketContext } from '../../context/socketContext';

import { GiHamburgerMenu } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";

const largeHome = () => {

  const {loading, users} = useGetUsers(false)
const {selectedUser, setUser} = Conversation();
const {onlineUser} = useSocketContext();

const userWithOnlineStatus = users.map(user => ({
  ...user,
  isOnline: onlineUser.includes(user._id)
}))

const [search, setSearch] = useState('')

const handleSearch = (e) => {
  e.preventDefault();
  if(!search)return;
  const result = users.find((any) => any.userName.toLowerCase().includes(search.toLowerCase()))


if(result){
  setUser(result);
  setSearch('')
}

}

const [follower, setFollower] = useState(false)

const handleFollower = (e) => {
  e.preventDefault();
  setFollower(count => count + 1)
}
  return (
    <div className='h-screen'>
      <div style={{position: 'relative', height: '5vh', background: '#e1eceb'}}>
        <div className='xl-header py-1' style={{alignItems: 'center'}}>

          <div className='flex flex-row justify-between' style={{alignItems: 'center'}}><GiHamburgerMenu /></div>
           {users && (<div>{users.userName}</div>)}
          <div className='flex flex-row justify-around w-2/12' style={{alignItems: 'center'}}>
            <div>icon 1</div>
            <div>icon 2</div>
            <div><VscAccount /></div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3 gap-4 fst-col' style={{height: '95%'}}>
        <div className='column overflow-y-auto h-full'>

        <div style={{zIndex: '-1', }} className='mt-1'>
        <div className='search-div' onSubmit={handleSearch}  style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       {/* <form action="" > */}
        <input 
        type="search" 
        placeholder='Type to search'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
        {/* <button type='submit'>search</button> */}
        {/* </form> */}
        </div>


        {userWithOnlineStatus
       .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
       .map((user, index) => (
      <div className='user-list' key={index}>
       <div style={{padding: '10px'}}>
       <div className='user-div'>
          
         <div className='user-pc'>

         {/* <div className={`avatar ${user.isOnline ? 'online' : 'offline'}`}>
           <div className="w-12 rounded-full">
             <img src={user.avatar} />
           </div>
           </div> */}

<Avatar className='avatar'
                     alt="Remy Sharp" 
                     src={user.avatar} sx={{ width: 46, height: 46 }} />
           
         </div>
         {/* {messages.map((message, idx) => ( */}
         <div className='user-detail'>
           <div className='user-name'>
             <div className='name'>{user.userName}</div>
             <div className='call'><MdCallMissed />   <div className="badge badge-primary">+1</div></div>
           </div>
           {/* {messages.map((message) => ( */}
           <div className='user-msg'>
             <div className='msg'>message content...  </div>
              
             <div className='time'>6 min ago</div>
           </div>
         </div>
       </div>
      
       </div>
     </div>
     ))}
     <div style={{paddingBottom: '100px'}}></div>
     </div>

        </div>
        <div className='poster overflow-y-auto h-full'>

        </div>
        <div className='status overflow-y-auto h-full'> 

        <>
         <div className='header-only'>
           <div className='head-content-only'>
             <div></div>
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

        </div>
      </div>
    </div>
  )
}

export default largeHome