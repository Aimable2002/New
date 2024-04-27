import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './signup.css'
import useSignup from '../../hook/useSignup.js';

const signup = () => {

  const {loading, signup} = useSignup();

  const [inputs, setInputs] = useState({
    userName: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {userName, age, gender, password, confirmPassword} = inputs
    await signup(inputs)
  }

  return (
    <div className='parent'>
        <div className='signup-container'>
            <div className='title'>
                <h1>Signup  <span className='title-color'>ChatApp</span></h1>
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
                <div className='input-field'>
                  <input 
                  type="age" 
                  placeholder='Enter age'
                  value={inputs.age}
                  onChange={(e) => setInputs({...inputs, age: e.target.value})} />
                </div>
                <div className='input-field'>
                <select 
                  value={inputs.gender} onChange={(e) => setInputs({...inputs, gender: e.target.value})}>
                  <option disabled selected value="">What is your gender?</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option Value="What I want">What you want</option>
                </select>
                </div>
                <div className='input-field'>
                  <input 
                  type="password" 
                  placeholder='Enter password'
                  value={inputs.password}
                  onChange={(e) => setInputs({...inputs, password: e.target.value})} />
                </div>
                <div className='input-field'>
                  <input 
                  type="password" 
                  placeholder='confirmPassword'
                  value={inputs.confirmPassword}
                  onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} />
                </div>
                <div className='input-field'>
                  <button onClick={handleSubmit}>Signup</button>
                </div>
              </form>
              <div className='input-field'>
                <Link to='/login'>Already have account</Link>
              </div>
            </div>
        </div>
    </div>
  )
}

export default signup