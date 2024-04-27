import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './account.css';
import  HomeIcon from '@mui/icons-material/Home';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import useLoggedUser from '../../hook/useGetLoggedUser';
import { CiMenuBurger } from "react-icons/ci";
import useGetUsers from '../../hook/useGetUsers';
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { MdFeaturedVideo } from "react-icons/md";
import uploadRequest from '../../hook/uploadRequest.js';
import { BsPlusCircleFill } from "react-icons/bs";



const Account = () => {

  const {loggedUser} = useLoggedUser();

  const {users} = useGetUsers(false)
  const [currentProfileUrl, setCurrentProfileUrl] = useState(loggedUser ? loggedUser.avatar : null);

  const {upload, loading} = uploadRequest();
  const [fileChange, setFileChange] = useState()
  const handleFileChange = async (e) => {

    setFileChange(e.target.files[0])
    await upload(e.target.files[0])
    setCurrentProfileUrl(e.target.files[0])
  }

  const profileInput = useRef();

  const handleProfileClick = () => {
    profileInput.current.click();
  }

  return (
   <div className='parent-container'>
    
      <div className='header-account'>
        <div>Chat web</div>
        <div><CiMenuBurger /></div>
      </div>
      
      <div className='user'>
      <div className='ac-pc'>
        <div className="avatar" onClick={handleProfileClick}>
          <div className="w-20 rounded-full">
            {loggedUser.map((log, idx) => (<img src={log.avatar} />))}
          </div>
          <input type="file"
          style={{display: 'none'}}
          ref={profileInput}
          onChange={handleFileChange} />
        </div>
        <div style={{display: 'flex', position: 'absolute', marginTop: '10vh', fontSize: '18px'}}><BsPlusCircleFill /></div>
        </div> 
        
        <div className='details'>
          <div className='pple'>
            <div className='row'>
              <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>follower</div>
              <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>1M</div>
            </div>
              <div className='row'>
                <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>Client</div>
                <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>150K</div>
              </div>
          </div>
          <div className='pple'>
            <div className='row'>
              <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>post</div>
              <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>4</div>
            </div>
              <div className='row'>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>following</div>
                <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>16</div>
              </div>
          </div>
        </div>
      </div>
      <div className='psn-name'>
      {loggedUser && (<div>{loggedUser.userName}</div>)}
        <div>www.libra.rw</div>
      </div>
    
    <div className='grd-icons'>
      <div style={{fontSize: '25px'}}><button><BiSolidPhotoAlbum /></button></div>
      <div style={{fontSize: '25px'}}><MdFeaturedVideo /></div>
      <div style={{fontSize: '25px'}}><MdFeaturedVideo /></div>
    </div>
    <div className="grid grid-cols-2 gap-4 mt-2">
      
  {users.map((log, idx) => (
    <div key={idx}>
      <img src={log.avatar} alt="" />
    </div>
  ))}
  
</div>

<div className='divider divide-y-4'></div>

    <div className='footer-icon' style={{zIndex: '2'}}>
        <Link to='/post'><div><HomeIcon /></div></Link>
        <div><DonutLargeIcon /></div>
        <div></div>
        <div className='up-icon'><AddCircleOutlineRoundedIcon /></div>
        <Link to='/'><div><ForumRoundedIcon /></div></Link>
        <div><AccountCircleIcon /></div>
      </div> 
    </div>
  )
}

export default Account