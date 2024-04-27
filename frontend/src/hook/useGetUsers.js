import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem("online-user")
//              const tokenString = '"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFjN2Q0NzJlMjk1NjA1NjA3NDJlZjAiLCJpYXQiOjE3MTM0NDgwOTgsImV4cCI6MTcxNDc0NDA5OH0.sd02UG3jXczoxo2fg6pi8arxOGAFFlXzE9bIyx5vD3A"';

// // // Extract the token value
// const token2 = tokenString.split('"token":"')[1].slice(0, -1);
            //  console.log(token);
            if(!token){
                throw new Error("no token found", error.message)
            }
            const res = await axios.get("http://localhost:8000/api/users/getUser", {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })
    
            const data = res.data;
    
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
  return {loading, users}
}

export default useGetUsers;