
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../signup/signup.css'
import useLogin from '../../hook/useLogin';


const login = () => {

  const {login} = useLogin();

  const [inputs, setInputs] = useState({
    userName: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {userName, password} = inputs
    await login(inputs)
  }

  return (
    <div className='parent'>
        <div className='signup-container'>
            <div className='title'>
                <h1>Login  <span className='title-color'>ChatApp</span></h1>
            </div>
            <div className='signup'>
              <form action="" className='signup-form' onSubmit={handleSubmit}>
                <div className='input-field'>
                  <input 
                  type="username" 
                  placeholder='Enter username'
                  value={inputs.userName}
                  onChange={(e) => setInputs({...inputs, userName: e.target.value})} />
                </div>
                {/* <div className='input-field'>
                  <input 
                  type="age" 
                  placeholder='Enter age'
                  value={inputs.age}
                  onChange={(e) => setInputs({...inputs, age: e.target.value})} />
                </div>
                <div className='input-field'>
                  <input 
                  type="gender" 
                  placeholder='Enter gender'
                  value={inputs.gender}
                  onChange={(e) => setInputs({...inputs, gender: e.target.value})} />
                </div> */}
                <div className='input-field'>
                  <input 
                  type="password" 
                  placeholder='Enter password'
                  value={inputs.password}
                  onChange={(e) => setInputs({...inputs, password: e.target.value})} />
                </div>
                {/* <div className='input-field'>
                  <input 
                  type="password" 
                  placeholder='confirmPassword'
                  value={inputs.confirmPassword}
                  onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} />
                </div> */}
                <div className='input-field'>
                  <button onClick={handleSubmit}>Login</button>
                </div>
              </form>
              <div className='input-field'>
                <Link to='/signup'>Dont have accout</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default login