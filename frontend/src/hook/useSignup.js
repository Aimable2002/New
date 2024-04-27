import React, { useState } from 'react'

import axios from 'axios';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
  const signup = async ({userName, age, gender, password, confirmPassword}) => {
    setLoading(true)
    try{
        const res = await axios.post('http://localhost:8000/api/auth/signup', {
            userName, age, gender, password, confirmPassword
        });
        
        const data = res.data;

        if(data.error){
            throw new Error("fail to get response from server" + error.message)
        }
        console.log("signup posted sucessfully")
        localStorage.setItem("online-user", JSON.stringify(data));

        window.location = '/'
    }catch(error){
        console.error(error.message)
    }finally{
        setLoading(false)
    }
  }
  return {loading, signup}
}

export default useSignup