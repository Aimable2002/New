import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useLoggedUser = () => {
  const [loading, setLoading] = useState(false);
  const [loggedUser, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem("online-user")
            if(!token){
                throw new Error("no token found", error.message)
            }
            const res = await axios.get("http://localhost:8000/api/users/getLoggedOne", {
                headers: {
                    Authorization: ` ${JSON.parse(token).token}`
                }
            })
    
            const data = res.data;

            console.log("recieved data :", data)
    
            if(data.error){
                throw new Error("fail to get user from server", error.message)
            }
            setUsers(data)

        }catch(error){
            console.error("fail to get user:", error.message)
        }finally{
            setLoading(false)
        }
      }
      getUser();
  },[])
  return {loading, loggedUser}
}

export default useLoggedUser