import axios from 'axios';
import React, { useState } from 'react'

const useLogin = () => {
  const  [loading, setLoading] = useState();

  const login = async ({userName, password}) => {
    setLoading(true)
    try{
        const res = await axios.post('https://chatapp-na06.onrender.com/api/auth/login', {
            userName, password
        });

        const data = res.data;
        console.log(data);
        

        if(data.error){
            throw new Error("fail to get response from server" + error.message)
        }

        console.log("login posted sucessfully")

        localStorage.setItem("online-user", JSON.stringify(data));
        window.location = '/'

    }catch(error){
        console.error(error.message)
    }finally{
        setLoading(false)
    }
  }
  return {loading, login}
}

export default useLogin