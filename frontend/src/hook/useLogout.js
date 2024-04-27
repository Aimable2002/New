import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../context/authContext';

const useLogout = () => {
    const [loading, setLoading] = useState();
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        setLoading(true)
        try{
            const res = await axios.post('http://localhost:8000/api/auth/logout')

            const data = res.data

            if(data.error){
                throw new Error("fail to logout", error.data)
            }

            localStorage.removeItem('online-user')

            setAuthUser(null)
        }catch(error){
            console.log("fail in client side logout", error)
        }finally{
            setLoading(false)
        }
    }

    return {loading, logout}
  
}

export default useLogout