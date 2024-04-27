import React from 'react'
import { Link } from 'react-router-dom';
import  HomeIcon from '@mui/icons-material/Home';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const post = () => {
  return (
    <div>
        <div>post</div>

        <button className="btn">Button</button>
<button className="btn btn-neutral">Neutral</button>
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-accent">Accent</button>
<button className="btn btn-ghost">Ghost</button>
<button className="btn btn-link">Link</button>

        <div className='footer-icon' style={{zIndex: '2'}}>
        <Link to='/post'><div><HomeIcon /></div></Link>
        <div><DonutLargeIcon /></div>
        <div></div>
        <div className='up-icon'><AddCircleOutlineRoundedIcon /></div>
        <Link to='/'><div><ForumRoundedIcon /></div></Link>
        <Link to='/account'><div><AccountCircleIcon /></div></Link>
      </div> 
    </div>
  )
}

export default post