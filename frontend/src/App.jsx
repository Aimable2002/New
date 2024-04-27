import { useState } from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Signup from './pages/signup/signup.jsx';
import { useAuthContext } from './context/authContext.jsx';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx'
import ChatRoom from './pages/chatRoom/chatRoom.jsx'
import Account from './pages/account/account.jsx';
import Post from './pages/post/post.jsx';
import { Navigate } from 'react-router-dom';

function App() {
  const {AuthUser} = useAuthContext();

  return (
    <div>
      <Routes>
        <Route path='/signup' element={AuthUser ? <Navigate to='/' /> : <Signup />} />
        <Route path='/login' element={AuthUser ? <Navigate to ='/' /> : <Login />} />
        <Route path='/' element={AuthUser ? <Home /> : <Navigate to ='/login' />} />
        <Route path='/chat/:id' element={AuthUser ? <ChatRoom /> : <Navigate to ='/login' /> } />
        <Route path='/account' element={AuthUser ? <Account /> : <Navigate to ='/login' /> } />
        <Route path='/post' element={AuthUser ? <Post /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App
